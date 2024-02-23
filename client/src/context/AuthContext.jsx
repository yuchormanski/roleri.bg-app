import { createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { USER_LOCAL_STORAGE_KEY, USER_ROLE } from "../services/environment.js";

const AuthContext = createContext();

function AutContextProvider({ children }) {
  const queryClient = useQueryClient();

  function addUserHandler(data) {
    return localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data))
  }

  function getUserHandler() {
    const queryUserData = queryClient.getQueryData(["user"]);
    const localStorageUserData = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY));

    return queryUserData || localStorageUserData || null;
  }

  function removeUserHandler() {
    return localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  }

  function checkIsUserLoggedIn() {
    return queryClient.getQueryData(["user"]) ?? !!getUserHandler();
  }

  function checkIsUserAdmin() {
    const userData = getUserHandler();
    const isAdmin = userData ? userData.role === USER_ROLE.admin : false;
    return isAdmin;
  }

  const values = {
    addUserHandler,
    getUserHandler,
    removeUserHandler,
    checkIsUserLoggedIn,
    checkIsUserAdmin,
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("AuthContext is used outside the context provider");
  }

  return context;
}

export { AutContextProvider, useAuthContext };
