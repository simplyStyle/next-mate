declare namespace Lucia {
  // lucia-auth.com/basics/database/
  // eslint-disable-next-line @typescript-eslint/consistent-type-imports
  type Auth = import('@/auth/lucia').Auth;

  type DatabaseUserAttributes = {
    username: string;
    email: string;
  };

  type DatabaseSessionAttributes = {
    //
  };

  type KeySchema = {
    //
  };
}
