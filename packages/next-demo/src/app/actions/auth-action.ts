'use server';

import { signOut } from '@/config/auth';

/**
 * Logout action, calls the signOut function from next-auth
 */
export async function logoutAction() {
  await signOut({
    redirect: true,
    redirectTo: '/',
  });
}
