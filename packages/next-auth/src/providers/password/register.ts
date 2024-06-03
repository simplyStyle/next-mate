import { generateId, type Lucia } from '../../lucia/index.js';

export async function register(
  lucia: Lucia,
  username: string,
  password: string,
  userAttributes?: object,
  authAttributes?: object
) {
  const userId = generateId(15);

  const users = await lucia.getUser({ username });
  if (users && users.length > 0) {
    return Promise.reject('user already exists');
  }

  await lucia.createUser({
    userId,
    username,
    password,
    providerMethod: 'password',
    userAttributes,
    authAttributes,
  });
  // await createSessionAndCookie(lucia, userId);
  return Promise.resolve();
}
