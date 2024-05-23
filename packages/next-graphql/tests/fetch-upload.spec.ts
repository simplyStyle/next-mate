import { GraphqlFetch } from '../src/graphql-fetch.js';
import { getBooks, usersData } from './mock-data.js';
import { startTestAppServer } from './test-server.js';

describe('Basic fetch of graphql fetch', () => {
  let port: any, app: any;

  beforeAll(async () => {
    ({ port, app } = await startTestAppServer());
  });

  it('Should be POST rest api /users', async () => {
    const fetcher = new GraphqlFetch({
      apiUrl: `http://localhost:${port}/users`,
      channelTokenKey: 'channel',
      authTokenHeaderKey: 'auth-token',
    });

    const response = await fetcher.fetch('users', {});
    expect(response.data).toStrictEqual(usersData);
    expect(response.res).toBeDefined();
    expect(response.languageCode).toBe('en');
    expect(response.newAuthToken).toBeNull();
  });

  it('Should be POST /graphql', async () => {
    const fetcher = new GraphqlFetch({
      apiUrl: `http://localhost:${port}/graphql`,
      channelTokenKey: 'channel',
      authTokenHeaderKey: 'auth-token',
    });

    const response = await fetcher.fetch<{ books: any }>(
      `{ books { id, title, author } }`,
      {}
    );
    expect(response.data.books).toStrictEqual(getBooks());
    expect(response.res).toBeDefined();
    expect(response.languageCode).toBe('en');
    expect(response.newAuthToken).toBeNull();
  });

  it('Should correct return errors', async () => {
    const fetcher = new GraphqlFetch({
      apiUrl: `http://localhost:${port}/graphql`,
      channelTokenKey: 'channel',
      authTokenHeaderKey: 'auth-token',
    });

    await expect(() =>
      fetcher.fetch<{ books: any }>(`{ books }`, {})
    ).rejects.toThrowError(
      'Field "books" of type "[Book!]!" must have a selection of subfields. Did you mean "books { ... }"?'
    );
  });

  afterAll(async () => {
    await app.close();
  });
});
