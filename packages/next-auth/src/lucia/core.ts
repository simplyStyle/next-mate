import { createDate, isWithinExpirationDate, TimeSpan } from 'oslo';
import type { Cookie, CookieAttributes } from 'oslo/cookie';
import { CookieController } from 'oslo/cookie';
import type { PasswordHashingAlgorithm } from './crypto.js';
import { generateIdFromEntropySize } from './crypto.js';
import type { Adapter, DatabaseAuth, DatabaseUser } from './database.js';
import type {
  RegisteredDatabaseAuthAttributes,
  RegisteredDatabaseSessionAttributes,
  RegisteredDatabaseUserAttributes,
  RegisteredLucia,
  UserId,
} from './type.js';

type SessionAttributes =
  RegisteredLucia extends Lucia<infer _SessionAttributes, any>
    ? _SessionAttributes
    : object;

type UserAttributes =
  RegisteredLucia extends Lucia<any, infer _UserAttributes>
    ? _UserAttributes
    : object;

export interface Session extends SessionAttributes {
  id?: number;
  token: string;
  expiresAt: Date;
  fresh: boolean;
  userId: UserId;
}

export interface User extends UserAttributes {
  id: string;
  username: string;
}

export class Lucia<
  _SessionAttributes extends object = Record<never, never>,
  _UserAttributes extends object = Record<never, never>,
  _AuthAttributes extends object = Record<never, never>,
> {
  private adapter: Adapter;
  private sessionExpiresIn: TimeSpan;
  private sessionCookieController: CookieController;

  private getSessionAttributes: (
    databaseSessionAttributes: RegisteredDatabaseSessionAttributes
  ) => _SessionAttributes;

  private getUserAttributes: (
    databaseUserAttributes: RegisteredDatabaseUserAttributes
  ) => _UserAttributes;

  private getAuthAttributes: (
    databaseUserAttributes: RegisteredDatabaseAuthAttributes
  ) => _AuthAttributes;

  public readonly sessionCookieName: string;

  constructor(
    adapter: Adapter,
    options?: {
      sessionExpiresIn?: TimeSpan;
      sessionCookie?: SessionCookieOptions;
      getSessionAttributes?: (
        databaseSessionAttributes: RegisteredDatabaseSessionAttributes
      ) => _SessionAttributes;
      getUserAttributes?: (
        databaseUserAttributes: RegisteredDatabaseUserAttributes
      ) => _UserAttributes;
      getAuthAttributes?: (
        databaseAuthAttributes: RegisteredDatabaseAuthAttributes
      ) => _AuthAttributes;
    }
  ) {
    this.adapter = adapter;

    // we have to use `any` here since TS can't do conditional return types
    this.getUserAttributes = (databaseUserAttributes): any => {
      if (options && options.getUserAttributes) {
        return options.getUserAttributes(databaseUserAttributes);
      }
      return {};
    };
    this.getSessionAttributes = (databaseSessionAttributes): any => {
      if (options && options.getSessionAttributes) {
        return options.getSessionAttributes(databaseSessionAttributes);
      }
      return {};
    };
    this.getAuthAttributes = (databaseAuthAttributes): any => {
      if (options && options.getAuthAttributes) {
        return options.getAuthAttributes(databaseAuthAttributes);
      }
      return {};
    };
    this.sessionExpiresIn = options?.sessionExpiresIn ?? new TimeSpan(30, 'd');
    this.sessionCookieName = options?.sessionCookie?.name ?? 'auth_session';
    let sessionCookieExpiresIn = this.sessionExpiresIn;
    if (options?.sessionCookie?.expires === false) {
      sessionCookieExpiresIn = new TimeSpan(365 * 2, 'd');
    }
    const baseSessionCookieAttributes: CookieAttributes = {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      ...options?.sessionCookie?.attributes,
    };
    this.sessionCookieController = new CookieController(
      this.sessionCookieName,
      baseSessionCookieAttributes,
      {
        expiresIn: sessionCookieExpiresIn,
      }
    );
  }

  public getScrypt(): PasswordHashingAlgorithm {
    return this.adapter.getScrypt();
  }

  public async getUserSessions(userId: UserId): Promise<Session[]> {
    const databaseSessions = await this.adapter.getUserSessions(userId);
    const sessions: Session[] = [];
    for (const databaseSession of databaseSessions) {
      if (!isWithinExpirationDate(databaseSession.expiresAt)) {
        continue;
      }
      sessions.push({
        token: databaseSession.token,
        expiresAt: databaseSession.expiresAt,
        userId: databaseSession.userId,
        fresh: false,
        ...this.getSessionAttributes(databaseSession.attributes),
      });
    }
    return sessions;
  }

  public async validateSession(
    token: string
  ): Promise<{ user: User; session: Session } | { user: null; session: null }> {
    const [databaseSession, databaseUser] =
      await this.adapter.getSessionAndUser(token);
    if (!databaseSession) {
      return { session: null, user: null };
    }
    if (!databaseUser) {
      await this.adapter.deleteSession(databaseSession.token);
      return { session: null, user: null };
    }
    if (!isWithinExpirationDate(databaseSession.expiresAt)) {
      await this.adapter.deleteSession(databaseSession.token);
      return { session: null, user: null };
    }
    const activePeriodExpirationDate = new Date(
      databaseSession.expiresAt.getTime() -
        this.sessionExpiresIn.milliseconds() / 2
    );
    const session: Session = {
      ...this.getSessionAttributes(databaseSession.attributes),
      id: databaseSession.id,
      token: databaseSession.token,
      userId: databaseSession.userId,
      fresh: false,
      expiresAt: databaseSession.expiresAt,
    };
    if (!isWithinExpirationDate(activePeriodExpirationDate)) {
      session.fresh = true;
      session.expiresAt = createDate(this.sessionExpiresIn);
      await this.adapter.updateSessionExpiration(
        databaseSession.token,
        session.expiresAt
      );
    }
    const user: User = {
      ...this.getUserAttributes(databaseUser.attributes),
      id: databaseUser.id,
      username: databaseUser.username,
    };
    return { user, session };
  }

  public async createSession(
    userId: UserId,
    attributes: RegisteredDatabaseSessionAttributes,
    options?: {
      token?: string;
    }
  ): Promise<Session> {
    const token = options?.token ?? generateIdFromEntropySize(25);
    const sessionExpiresAt = createDate(this.sessionExpiresIn);
    await this.adapter.setSession({
      token: token,
      userId,
      expiresAt: sessionExpiresAt,
      attributes,
    });
    const session: Session = {
      token: token,
      userId,
      fresh: true,
      expiresAt: sessionExpiresAt,
      ...this.getSessionAttributes(attributes),
    };
    return session;
  }

  public async invalidateSession(token: string): Promise<void> {
    await this.adapter.deleteSession(token);
  }

  public async invalidateUserSessions(userId: UserId): Promise<void> {
    await this.adapter.deleteUserSessions(userId);
  }

  public async deleteExpiredSessions(): Promise<void> {
    await this.adapter.deleteExpiredSessions();
  }

  public readSessionCookie(cookieHeader: string): string | null {
    return this.sessionCookieController.parse(cookieHeader);
  }

  public readBearerToken(authorizationHeader: string): string | null {
    const [authScheme, token] = authorizationHeader.split(' ') as [
      string,
      string | undefined,
    ];
    if (authScheme !== 'Bearer') {
      return null;
    }
    return token ?? null;
  }

  public createSessionCookie(token: string): Cookie {
    return this.sessionCookieController.createCookie(token);
  }

  public createBlankSessionCookie(): Cookie {
    return this.sessionCookieController.createBlankCookie();
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
    return await this.adapter.createUser(options);
  }

  public async validatePassword(
    hashPassword: string,
    password: string
  ): Promise<boolean> {
    return await this.adapter.validatePassword(hashPassword, password);
  }

  public async getAuthorized(
    options: Partial<Omit<DatabaseAuth, 'attributes'>>
  ): Promise<DatabaseAuth[]> {
    return await this.adapter.getAuthorized(options);
  }
  public async getUser(
    options: Partial<Omit<DatabaseUser, 'attributes'>>
  ): Promise<DatabaseUser[]> {
    return await this.adapter.getUser(options);
  }
}

export interface SessionCookieOptions {
  name?: string;
  expires?: boolean;
  attributes?: SessionCookieAttributesOptions;
}

export interface SessionCookieAttributesOptions {
  sameSite?: 'lax' | 'strict' | 'none';
  domain?: string;
  path?: string;
  secure?: boolean;
}
