export interface OAuth2Provider {
  createAuthorizationURL(state: string): Promise<URL>;
  validateAuthorizationCode(code: string): Promise<Tokens>;
  refreshAccessToken?(refreshToken: string): Promise<Tokens>;
}

export interface Tokens {
  accessToken: string;
  refreshToken?: string | null;
  accessTokenExpiresAt?: Date;
  refreshTokenExpiresAt?: Date | null;
  idToken?: string;
}

export interface ProviderConfig {
  clientId: string;
  clientSecret: string;
  redirectUri?: string;
  enterpriseDomain?: string;
}
