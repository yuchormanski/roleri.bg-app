import { createContext, useContext } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { USER_LOCAL_STORAGE_KEY } from "../services/environment.js";

const AuthContext = createContext();

function AutContextProvider({ children }) {
  const queryClient = useQueryClient();

  const addUserHandler = (data) => {
    localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  //   const getUserHandler = () => {
  //     try {
  //       const localStorageData = JSON.parse(
  //         localStorage.getItem(USER_LOCAL_STORAGE_KEY)
  //       );
  //       return localStorageData ? localStorageData : null;
  //     } catch (error) {
  //       console.error(error);
  //       return null;
  //     }
  //   };

  function getUserHandler() {
    return JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)) ?? null;
  }

  const removeUserHandler = () => {
    localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
  };

  //   const checkIsUserLoggedIn = () => {
  //     // Get user data from React Query
  //     const userDataFromQuery = queryClient.getQueryData(["user"]);
  //     if (userDataFromQuery) {
  //       return true;
  //     } else {
  //       // Get user data from local storage
  //       const userDataFromLocalStorage = getUserHandler();
  //       return !!userDataFromLocalStorage;
  //     }
  //   };

  function checkIsUserLoggedIn() {
    return queryClient.getQueryData(["user"]) ?? !!getUserHandler();
  }

  const values = {
    addUserHandler,
    getUserHandler,
    removeUserHandler,
    checkIsUserLoggedIn,
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
