import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthContext } from "../../context/AuthContext.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";

import { SERVER_ENDPOINTS } from "../../services/environment.js";
import { post, get, put } from "../../api/api.js";

function useAuthQueries() {
  const queryClient = useQueryClient();
  const { addUserHandler, removeUserHandler } = useAuthContext();

  const { redirectTo } = useMoveBack();

  const loginMutation = useMutation({
    enabled: false,
    mutationFn: (userData) => post(SERVER_ENDPOINTS.LOGIN, userData),
    onSuccess: (userData) => {
      toast.success("Login success!");
      // Save the user data to the cache
      queryClient.setQueryData(["user"], userData);
      // Save the user data to local storage
      addUserHandler(userData);

      redirectTo("/lessons");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const registerMutation = useMutation({
    enabled: false,
    mutationFn: (userData) => post(SERVER_ENDPOINTS.REGISTER, userData),
    onSuccess: (userData) => {
      toast.success("Registration success!");
      // Save the user data to the cache
      queryClient.setQueryData(["user"], userData);
      // Save the user data to local storage
      addUserHandler(userData);

      redirectTo("/lessons");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const logoutMutation = useMutation({
    enabled: false,
    mutationFn: () => get(SERVER_ENDPOINTS.LOGOUT),
    onSuccess: () => {
      toast.success("Logout successfully!");
      // Clear the user data from the cache
      queryClient.removeQueries({ queryKey: ["user"], exact: true });
      // Clear the user data from the local storage
      removeUserHandler();

      redirectTo("/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const forgotPasswordMutation = useMutation({
    enabled: false,
    mutationFn: (data) => post(SERVER_ENDPOINTS.FORGOT_PASSWORD, data),
    onSuccess: () => {
      toast.success("Reset link is send successfully!");

      redirectTo("/home");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const resetPasswordMutation = useMutation({
    enabled: false,
    mutationFn: (data) => put(SERVER_ENDPOINTS.RESET_PASSWORD, data),
    onSuccess: (userData) => {
      toast.success("Password is changed successfully!");
      // Save the user data to the cache
      queryClient.setQueryData(["user"], userData);
      // Save the user data to local storage
      addUserHandler(userData);

      redirectTo("/lessons");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { loginMutation, registerMutation, logoutMutation, forgotPasswordMutation, resetPasswordMutation };
}

export { useAuthQueries };
