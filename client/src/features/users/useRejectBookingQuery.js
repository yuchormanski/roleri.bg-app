import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { put } from "../../api/api.js";

function useRejectBookingQuery() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    enabled: false,
    mutationFn: (data) => put(SERVER_ENDPOINTS.REJECT_BOOKING, data),
    onSuccess: (data) => {
      toast.success("User updated!");
      // Save the user data to the cache
      queryClient.setQueryData(["booking"], (oldState) => oldState.map(b => b._id === data._id ? data : b));
      queryClient.invalidateQueries(["booking"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateAsync, mutate, isPending };
}

export { useRejectBookingQuery };
