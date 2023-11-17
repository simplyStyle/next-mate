import { logoutAction } from '@/app/actions/auth-action';

export const LogoutButton = () => {
  return (
    <form action={logoutAction}>
      <button type="submit">Sign out</button>
    </form>
  );
};
