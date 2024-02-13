import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { post } from "../api/api.js";
import { SERVER_ENDPOINTS } from "../services/environment.js";

export function useRegister() {
  const queryClient = useQueryClient();
  const { isLoading, mutate: registerUser } = useMutation({
    mutationFn: (data) => {
      post(SERVER_ENDPOINTS.REGISTER, data);
    },
    onSuccess: () => {
      toast.success("User was successful registered!");
      //   queryClient.invalidateQueries({ queryKey: ["user"] });
    },

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { isLoading, registerUser };
}
