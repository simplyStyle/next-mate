/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Lucia } from './core.js';

export interface Register {}

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
  : {};

export type RegisteredDatabaseSessionAttributes = Register extends {
  DatabaseSessionAttributes: infer _DatabaseSessionAttributes;
}
  ? _DatabaseSessionAttributes
  : {};

export type RegisteredDatabaseAuthAttributes = Register extends {
  DatabaseAuthAttributes: infer _DatabaseAuthAttributes;
}
  ? _DatabaseAuthAttributes
  : {};
