import { type OAuth2ProviderUserAuth } from './provider.js';

export abstract class OAuth2ProviderAuth<
  ProviderUserAuth extends OAuth2ProviderUserAuth = OAuth2ProviderUserAuth,
  OAuth2 = ProviderUserAuth extends OAuth2ProviderUserAuth<infer OAuth2>
    ? OAuth2
    : never,
> {
  protected auth: OAuth2;

  constructor(auth: OAuth2) {
    this.auth = auth;
  }

  abstract validateCallback: (code: string) => Promise<ProviderUserAuth>;
  abstract getAuthorizationUrl: (
    returnUrl?: string
  ) => Promise<readonly [url: URL, state: string]>;
}
