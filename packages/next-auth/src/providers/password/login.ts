import { type Lucia } from '../../lucia/core.js';
import { createSessionAndCookie } from '../../utils/createSessionAndCookie.js';

export async function login(lucia: Lucia, username: string, password: string) {
  const existingUsers = await lucia.getUser({ username });
  const existingUser = existingUsers?.[0];
  if (!existingUser) {
    return Promise.reject('user not exist');
  }

  const auths = await lucia.getAuthorized({
    userId: existingUser.id,
    providerMethod: 'password',
  });
  const auth = auths?.[0];
  const validPassword = await lucia
    .getScrypt()
    .verify(auth.hashedPassword ?? '', password);
  if (!validPassword) {
    return Promise.reject('Incorrect username or password');
  }
  await createSessionAndCookie(lucia, existingUser.id);
  return Promise.resolve();
}
