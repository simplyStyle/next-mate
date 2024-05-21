import { type PasswordHashingAlgorithm } from 'oslo/password';
import type {
  RegisteredDatabaseSessionAttributes,
  RegisteredDatabaseUserAttributes,
  RegisteredDatabaseAuthAttributes,
  UserId,
} from './index.js';

export interface Adapter {
  getSessionAndUser(
    token: string
  ): Promise<[session: DatabaseSession | null, user: DatabaseUser | null]>;
  getUserSessions(userId: UserId): Promise<DatabaseSession[]>;
  setSession(session: DatabaseSession): Promise<void>;
  updateSessionExpiration(token: string, expiresAt: Date): Promise<void>;
  deleteSession(token: string): Promise<void>;
  deleteUserSessions(userId: UserId): Promise<void>;
  deleteExpiredSessions(): Promise<void>;
  validatePassword(hashPassword: string, password: string): Promise<boolean>;
  createUser(options: {
    userId?: string;
    authId?: string;
    username: string;
    providerMethod: string;
    password?: string;
    providerId?: string;
    authAttributes?: RegisteredDatabaseAuthAttributes;
    userAttributes?: RegisteredDatabaseUserAttributes;
  }): Promise<void>;
  getAuthorized(
    options: Partial<Omit<DatabaseAuth, 'attributes'>>
  ): Promise<DatabaseAuth[]>;
  getUser(
    options: Partial<Omit<DatabaseUser, 'attributes'>>
  ): Promise<DatabaseUser[]>;
  getScrypt(): PasswordHashingAlgorithm;
}

export interface DatabaseUser {
  id: UserId;
  username: string;
  attributes: RegisteredDatabaseUserAttributes;
}

export interface DatabaseSession {
  id?: number;
  userId: UserId;
  expiresAt: Date;
  token: string;
  attributes: RegisteredDatabaseSessionAttributes;
}

export interface DatabaseAuth {
  id: string;
  userId: UserId;
  providerMethod: string;
  hashedPassword?: string;
  providerId?: string;
  attributes: RegisteredDatabaseAuthAttributes;
}
