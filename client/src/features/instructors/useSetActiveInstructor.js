import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { put } from "../../api/api.js";

function useSetActiveInstructor() {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending } = useMutation({
    enabled: false,
    mutationFn: (data) => put(SERVER_ENDPOINTS.ADD_BOOKING_INSTRUCTOR, data),
    onSuccess: (data) => {
      queryClient.invalidateQueries(["coaches"]);
      toast.success("Successful set instructor", { duration: 1400 });
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutateAsync, mutate, isPending };
}

export { useSetActiveInstructor };
