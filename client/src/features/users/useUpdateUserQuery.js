import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

import { put } from "../../api/api.js";

function useUpdateUserQuery() {
  const queryClient = useQueryClient();
  const { updateUserHandler } = useAuthContext();

  const { mutateAsync, mutate, isPending } = useMutation({
    enabled: false,
    mutationFn: (userData) => put(SERVER_ENDPOINTS.UPDATE_USER, userData),
    onSuccess: (userData) => {
      // Save the user data to the cache
      queryClient.setQueryData(["user"], userData);
      // Save the user data to local storage
      updateUserHandler(userData);

      queryClient.invalidateQueries(["user"]);
      toast.success("User updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateAsync, mutate, isPending };
}

export { useUpdateUserQuery };
