export function useUser() {
  const user = localStorage.getItem("user");
  const parsedUser = user ? JSON.parse(user) : null;

  return parsedUser;
}
