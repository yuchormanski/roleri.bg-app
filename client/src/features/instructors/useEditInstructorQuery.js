import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { put } from "../../api/api.js";

function useEditInstructorQuery(actionType) {
  const queryClient = useQueryClient();

  const endPoints = {
    present: SERVER_ENDPOINTS.EDIT_COACH_IS_PRESENT,
    notPresent: SERVER_ENDPOINTS.EDIT_COACH_IS_NOT_PRESENT,
    paid: SERVER_ENDPOINTS.EDIT_COACH_IS_PAID,
    notPaid: SERVER_ENDPOINTS.EDIT_COACH_IS_NOT_PAID,
    editNote: SERVER_ENDPOINTS.EDIT_COACH_NOTE,
  };

  const messages = {
    present: "Current user is marked as present",
    notPresent: "Current user is marked as non present",
    paid: "Current user is marked as paid",
    notPaid: "Current user is marked unpaid",
    editNote: "Successfully edited",
  };

  const { mutateAsync, mutate, isPending } = useMutation({
    enabled: false,
    mutationFn: (optionsData) => put(endPoints[actionType], optionsData),
    onSuccess: (optionsData) => {
      toast.success(messages[actionType], { duration: 1400 });
      queryClient.invalidateQueries(["lessonsActive"]);

      // if (actionType === "editNote") {
      //     queryClient.invalidateQueries(["lessonsActive"]);
      // }
    },
    onError: (error) => toast.error(error.message),
  });

  return { mutateAsync, mutate, isPending };
}

export { useEditInstructorQuery };
