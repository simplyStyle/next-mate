import { github } from '@lucia-auth/oauth/providers';
import { type Auth } from 'lucia';
import { authEnv } from '../../auth-env.js';
import { ensureSlash } from '../../utils/auth-utils.js';
import { authorizeCallbackHandler, authorizeHandler } from './handlers.js';

export type GithubConfig = {
  clientId: string;
  clientSecret: string;
  scope?: string[];
  redirectUri?: string;
};

export const createGithubProvider = (auth: Auth, config: GithubConfig) => {
  return github(auth, {
    redirectUri: `${ensureSlash(
      authEnv?.LUCIA_AUTH_URL || ''
    )}/api/auth/github/callback`,
    scope: ['user:email'],
    ...config,
  });
};

export const githubProviderHandlers = {
  authorizeCallbackHandler,
  authorizeHandler,
};
