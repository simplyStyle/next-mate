import { GitHub } from 'arctic';
import { type ProviderConfig } from '../providerType.js';
import { authorizeCallbackHandler, authorizeHandler } from './handlers.js';

export const createGithubProvider = (config: ProviderConfig) => {
  const { redirectUri, clientId, clientSecret, enterpriseDomain } = config;
  return new GitHub(clientId, clientSecret, {
    redirectURI: redirectUri,
    enterpriseDomain: enterpriseDomain,
  });
};

export const githubProviderHandlers = {
  authorizeCallbackHandler,
  authorizeHandler,
};
