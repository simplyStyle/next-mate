import { githubProviderHandlers } from '@hyperse-io/next-auth';
import { auth, githubAuth } from '@/auth/lucia';

export const GET = async () => {
  return githubProviderHandlers.authorizeHandler(auth, githubAuth, {
    secure: process.env.NODE_ENV === 'production',
  });
};
