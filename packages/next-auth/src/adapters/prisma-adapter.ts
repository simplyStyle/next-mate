import { alphabet, generateRandomString } from 'oslo/crypto';
import type { Prisma } from '@prisma/client';
import {
  type Adapter,
  type DatabaseAuth,
  type DatabaseSession,
  type DatabaseUser,
  generateIdFromEntropySize,
  type PasswordHashingAlgorithm,
  type RegisteredDatabaseAuthAttributes,
  type RegisteredDatabaseSessionAttributes,
  type RegisteredDatabaseUserAttributes,
  Scrypt,
  type UserId,
} from '../lucia/index.js';

interface prismaConfig {
  session: Prisma.SessionDelegate;
  user: Prisma.UserDelegate;
  authorized: Prisma.AuthorizedDelegate;
}

export class PrismaAdapter implements Adapter {
  private sessionModel: Prisma.SessionDelegate;
  private userModel: Prisma.UserDelegate;
  private authModel: Prisma.AuthorizedDelegate;
  public scrypt: PasswordHashingAlgorithm;

  constructor({
    session: sessionModel,
    user: userModel,
    authorized: authModel,
  }: prismaConfig) {
    this.sessionModel = sessionModel;
    this.userModel = userModel;
    this.authModel = authModel;

    const scrypt = new Scrypt();
    this.scrypt = scrypt;
  }

  public getScrypt(): PasswordHashingAlgorithm {
    return this.scrypt;
  }

  public async deleteSession(token: string): Promise<void> {
    try {
      await this.sessionModel.delete({
        where: {
          token: token,
        },
      });
    } catch {
      // ignore if session id is invalid
    }
  }

  public async deleteUserSessions(userId: UserId): Promise<void> {
    await this.sessionModel.deleteMany({
      where: {
        userId,
      },
    });
  }

  public async getSessionAndUser(
    token: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]> {
    const result = await this.sessionModel.findUnique({
      where: {
        token: token,
      },
      include: {
        user: true,
      },
    });
    if (!result) return [null, null];
    const { user: userResult, ...sessionResult } = result;
    return [
      transformIntoDatabaseSession(sessionResult),
      transformIntoDatabaseUser(userResult),
    ];
  }

  public async getUserSessions(userId: UserId): Promise<DatabaseSession[]> {
    const result = await this.sessionModel.findMany({
      where: {
        userId,
      },
    });
    return result.map(transformIntoDatabaseSession);
  }

  public async setSession(value: DatabaseSession): Promise<void> {
    await this.sessionModel.create({
      data: {
        token: value.token,
        userId: value.userId,
        expiresAt: value.expiresAt,
        ...value.attributes,
      },
    });
  }

  public async updateSessionExpiration(
    token: string,
    expiresAt: Date
  ): Promise<void> {
    await this.sessionModel.update({
      where: {
        token: token,
      },
      data: {
        expiresAt,
      },
    });
  }

  public async deleteExpiredSessions(): Promise<void> {
    await this.sessionModel.deleteMany({
      where: {
        expiresAt: {
          lte: new Date(),
        },
      },
    });
  }

  public async validatePassword(
    hashPassword: string,
    password: string
  ): Promise<boolean> {
    return await this.scrypt.verify(hashPassword, password);
  }

  public async createUser(options: {
    userId?: string;
    authId?: string;
    username: string;
    providerMethod: string;
    password?: string;
    providerId?: string;
    authAttributes?: RegisteredDatabaseAuthAttributes;
    userAttributes?: RegisteredDatabaseUserAttributes;
  }): Promise<void> {
    const userId =
      options.userId ?? generateRandomString(15, alphabet('a-z', 'A-Z', '0-9'));
    const authId = options.authId ?? generateIdFromEntropySize(25);
    const authAttributes = options.authAttributes ?? {};
    const userAttributes = options.userAttributes ?? {};
    let hashedPassword: string | undefined;
    if (!isNil(options.password)) {
      hashedPassword = await this.scrypt.hash(options.password as string);
    }

    const users = await this.userModel.findMany({
      where: { username: options.username },
    });
    const user = users?.[0];
    if (isNil(user)) {
      await this.userModel.create({
        data: {
          id: userId,
          username: options.username,
          ...userAttributes,
        },
      });
      await this.authModel.create({
        data: {
          id: authId,
          userId,
          providerMethod: options.providerMethod,
          providerId: options.providerId,
          hashedPassword,
          ...authAttributes,
        },
      });
    } else {
      const authInfos = await this.authModel.findMany({
        where: { userId: user?.id, providerMethod: options.providerMethod },
      });
      const authInfo = authInfos?.[0];

      if (isNil(authInfo)) {
        await this.authModel.create({
          data: {
            id: authId,
            userId: user?.id as string,
            providerMethod: options.providerMethod,
            providerId: options.providerId,
            hashedPassword: hashedPassword,
            ...authAttributes,
          },
        });
      } else {
        await this.authModel.update({
          data: {
            providerMethod: options.providerMethod,
            providerId: options.providerId,
            hashedPassword: hashedPassword,
            ...authAttributes,
          },
          where: { id: authInfo?.id },
        });
      }
    }
  }

  public async getUser(
    options: Partial<Omit<UserSchema, 'attributes'>>
  ): Promise<DatabaseUser[]> {
    const userInfo = (await this.userModel.findMany({
      where: { ...options },
    })) as unknown as UserSchema[];
    return userInfo.map(transformIntoDatabaseUser);
  }

  public async getAuthorized(
    options: Partial<Omit<AuthSchema, 'attributes'>>
  ): Promise<DatabaseAuth[]> {
    const authInfo = (await this.authModel.findMany({
      where: { ...options },
    })) as unknown as AuthSchema[];
    return authInfo.map(transformIntoDatabaseAuth);
  }
}

function transformIntoDatabaseSession(raw: SessionSchema): DatabaseSession {
  const { id, token, userId, expiresAt, ...attributes } = raw;
  return {
    id,
    token,
    userId,
    expiresAt,
    attributes,
  };
}

function transformIntoDatabaseUser(raw: UserSchema): DatabaseUser {
  const { id, username, ...attributes } = raw;
  return {
    id,
    username,
    attributes,
  };
}

function transformIntoDatabaseAuth(raw: AuthSchema): DatabaseAuth {
  const {
    id,
    userId,
    providerMethod,
    hashedPassword,
    providerId,
    ...attributes
  } = raw;
  return {
    id,
    userId,
    providerMethod,
    hashedPassword,
    providerId,
    attributes,
  };
}

function isNil(value: unknown): boolean {
  return value === undefined || value === null;
}

interface UserSchema extends RegisteredDatabaseUserAttributes {
  id: UserId;
  username: string;
}

interface SessionSchema extends RegisteredDatabaseSessionAttributes {
  id?: number;
  token: string;
  userId: UserId;
  expiresAt: Date;
}

interface AuthSchema extends RegisteredDatabaseAuthAttributes {
  id: string;
  userId: UserId;
  providerMethod: string;
  hashedPassword?: string;
  providerId?: string;
}
