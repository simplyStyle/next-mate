export const GithubLoginButton = (props: {
  callbackUrl?: string;
  className?: string;
}) => {
  return (
    <form method="get" action={`/api/auth/github`}>
      <input
        type="hidden"
        name="callbackUrl"
        value={props.callbackUrl || '/'}
      />
      <button type="submit" className={props.className}>
        Sign in with GitHub
      </button>
    </form>
  );
};
