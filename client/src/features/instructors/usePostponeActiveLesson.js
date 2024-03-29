import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function usePostponeActiveLesson() {
    const queryClient = useQueryClient();

    const { mutateAsync, mutate, isPending, isFetching } = useMutation({
        enabled: false,
        mutationFn: (activeLessonBookedUsersCustomIds) => post(SERVER_ENDPOINTS.POSTPONE_LESSON, activeLessonBookedUsersCustomIds),
        onSuccess: (activeLessonBookedUsersCustomIds) => {
            queryClient.invalidateQueries(["lessonsActive"]);
            toast.success("Successful postponed lessons", { duration: 1400 });
        },
        onError: (error) => toast.error(error.message),
    });

    return { mutateAsync, mutate, isPending, isFetching};
}

export { usePostponeActiveLesson };