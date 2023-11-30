import { type Auth } from 'lucia';
import { cookies, headers } from 'next/headers.js';

export const getSession = (auth: Auth, method: string) => {
  const authRequest = auth.handleRequest(method, {
    headers,
    cookies,
  });
  return authRequest.validate();
};
