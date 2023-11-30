export const LogoutButton = () => {
  return (
    <form action="/api/auth/logout">
      <input type="submit" value="Sign out" className="cursor-pointer" />
    </form>
  );
};
