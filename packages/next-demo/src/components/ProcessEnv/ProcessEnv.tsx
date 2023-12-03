export const ProcessEnv = () => {
  const env = {
    NODE_ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    VERCEL_URL: process.env.VERCEL_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
  };
  return (
    <details open>
      <summary>process.env</summary>
      <pre>{JSON.stringify(env, null, 4)}</pre>
    </details>
  );
};
