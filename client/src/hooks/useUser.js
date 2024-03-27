import { USER_LOCAL_STORAGE_KEY } from "../services/environment.js";

export function useUser() {
  const userData = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));
  return { userData };
}
