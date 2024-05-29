import { type Auth } from '@/auth/lucia';

declare module 'lucia' {
  interface Register {
    Lucia: Auth;
    DatabaseSessionAttributes: DatabaseSessionAttributes;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  interface DatabaseSessionAttributes {}

  interface DatabaseUserAttributes {
    email: string;
  }
}
