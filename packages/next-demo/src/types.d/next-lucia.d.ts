import { type Auth } from '@/auth/lucia';

declare module 'lucia' {
  interface Register {
    Lucia: Auth;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
  interface DatabaseSessionAttributes {}

  interface DatabaseUserAttributes {
    email: string;
  }
}
