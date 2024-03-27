import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function useGetHistory() {
  const { mutateAsync, mutate, isPending, data } = useMutation({
    enabled: false,
    mutationFn: (data) => post(SERVER_ENDPOINTS.GET_ALL_BOOKING_HISTORY, data),

    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateAsync, mutate, isPending, data };
}

export { useGetHistory };
