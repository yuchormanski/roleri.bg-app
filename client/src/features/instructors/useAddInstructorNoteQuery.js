import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function useAddInstructorNoteQuery() {
    const queryClient = useQueryClient();

    const { mutateAsync, mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (noteData) => post(SERVER_ENDPOINTS.ADD_COACH_NOTE, noteData),
        onSuccess: (noteData) => {
            queryClient.invalidateQueries(["lessonsActive"]);
            toast.success("Successful added new note", { duration: 1400 });
        },
        onError: (error) => toast.error(error.message),
    });

    return { mutateAsync, mutate, isPending };
}

export { useAddInstructorNoteQuery };