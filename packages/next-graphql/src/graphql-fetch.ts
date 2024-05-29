import { createRequestBody } from './create-request-body.js';
import { ShopApiError } from './errors.js';

export type ApiFetchOptions<Variables = Record<string, unknown>> = {
  /**
   * multiple channel support `channel`
   */
  channel?: string;
  /**
   * multiple lanaguage support `languageCode`
   */
  languageCode?: string;
  /**
   * authorization `Bearer ${?}`
   */
  authToken?: string;
  /**
   * api request variables
   */
  variables?: Variables;
};

export type GraphQLFetcherResult<Data = unknown> = {
  res: Response;
  data: Data;
  languageCode: string;
  newAuthToken: null | string;
};

export type GraphQLFetcherConfig = {
  apiUrl: string;
  channelTokenKey: string;
  authTokenHeaderKey: string;
};

export class GraphqlFetch {
  constructor(private config: GraphQLFetcherConfig) {
    this.config = Object.assign(
      {
        channelTokenKey: 'channel',
        authTokenHeaderKey: 'auth-token',
      },
      config
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  async fetch<Data, Variables extends Record<string, unknown> = {}>(
    query: string,
    queryData: ApiFetchOptions<Variables> = {},
    fetchOptions: RequestInit = {}
  ): Promise<GraphQLFetcherResult<Data>> {
    const { variables, languageCode = 'en', channel, authToken } = queryData;
    if (!query) {
      throw new Error('No graphql "query" providered!');
    }

    if (!this.config.apiUrl) {
      throw new Error('No graphql "apiUrl" providered!');
    }

    const url = new URL('', this.config.apiUrl);

    // Attach `languageCode` to query string
    url.searchParams.set('languageCode', languageCode);

    // Normalize the request body to handle form file uploads.
    const normalizedBody = createRequestBody(query, variables) as
      | string
      | FormData;

    const headers: HeadersInit = {
      ...(typeof normalizedBody === 'string'
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...fetchOptions?.headers,
    };

    if (authToken) {
      (headers as any)['Authorization'] = `Bearer ${authToken}`;
    }

    if (channel) {
      (headers as any)[this.config.channelTokenKey] = channel;
    }

    const res = await fetch(url.href, {
      headers,
      method: 'POST',
      body: normalizedBody,
      ...fetchOptions,
    });

    // always return { data, errors }
    // refer to https://www.vendure.io/docs/developer-guide/error-handling/#expected-errors-(errorresults)
    const json = await res.json();
    if (json.errors) {
      throw new ShopApiError(
        res,
        json.errors[0]?.message ||
          json.errors[0]?.extensions?.code ||
          'Failed to fetch Shop API',
        json.errors[0]?.extensions?.code
      );
    }

    // Update authorization for mutation `login, logout, activeOrder, addtocart, adjustOrderLine...`
    // Handle vendure @Allow(Permission.Owner), Vendure returns a Set-Cookie header with the auth cookie
    const newAuthToken =
      res.headers.get(this.config.authTokenHeaderKey) || null;

    return { data: json.data, res, newAuthToken, languageCode };
  }
}
