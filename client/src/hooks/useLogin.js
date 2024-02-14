import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../api/api.js";
import { SERVER_ENDPOINTS } from "../services/environment.js";
import toast from "react-hot-toast";

function useLogin() {
  const queryClient = useQueryClient();
  const {
    data,
    error,
    isPending: isLoading,
    mutate,
  } = useMutation({
    mutationFn: (user) => post(SERVER_ENDPOINTS.LOGIN, user),
    onSuccess: (data) => {
      //   console.log(data);
      toast.success("Login success!");
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, mutate, data };
}

export { useLogin };
