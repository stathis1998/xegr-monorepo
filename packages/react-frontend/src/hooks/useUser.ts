import { UserModel } from "@/types/userTypes";

export function useUser(): UserModel | undefined {
  const localStorageUser = localStorage.getItem("user");
  if (!localStorageUser) return undefined;

  const user: UserModel | undefined = JSON.parse(localStorageUser);

  return user;
}
