'use server';

import { signOut } from '@/common/auth/create-auth';

/**
 * Logout action, calls the signOut function from next-auth
 */
export async function logoutAction() {
  await signOut({
    redirect: true,
    redirectTo: '/',
  });
}
