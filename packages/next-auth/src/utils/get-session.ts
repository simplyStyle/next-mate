import { cookies } from 'next/headers.js';
import { type Session, type User, type Lucia } from '../lucia/index.js';

export type IGetSessionReturn = {
  session: Session | null;
  user: User | null;
} | null;

export const getSession = async (lucia: Lucia): Promise<IGetSessionReturn> => {
  const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;
  if (!sessionId) return null;
  const { session, user } = await lucia.validateSession(sessionId);
  return { session, user };
};
