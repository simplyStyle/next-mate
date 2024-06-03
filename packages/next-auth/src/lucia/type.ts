import type { Lucia } from './core.js';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface Register {
  //
}

export type UserId = Register extends {
  UserId: infer _UserId;
}
  ? _UserId
  : string;

export type RegisteredLucia = Register extends {
  Lucia: infer _Lucia;
}
  ? _Lucia extends Lucia<any, any>
    ? _Lucia
    : Lucia
  : Lucia;

export type RegisteredDatabaseUserAttributes = Register extends {
  DatabaseUserAttributes: infer _DatabaseUserAttributes;
}
  ? _DatabaseUserAttributes
  : object;

export type RegisteredDatabaseSessionAttributes = Register extends {
  DatabaseSessionAttributes: infer _DatabaseSessionAttributes;
}
  ? _DatabaseSessionAttributes
  : object;

export type RegisteredDatabaseAuthAttributes = Register extends {
  DatabaseAuthAttributes: infer _DatabaseAuthAttributes;
}
  ? _DatabaseAuthAttributes
  : object;
