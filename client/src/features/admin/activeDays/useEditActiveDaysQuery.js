import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../../services/environment.js";

import { put } from "../../../api/api.js";

function useEditActiveDaysQuery(actionType) {
    const endPoints = {
        edit_individual_day: SERVER_ENDPOINTS.EDIT_ACTIVE_DAYS_INDIVIDUAL,
        edit_regular_day: SERVER_ENDPOINTS.EDIT_ACTIVE_DAYS_REGULAR,
    }

    const queryClient = useQueryClient();

    const { mutateAsync, mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (activeDaysData) => put(endPoints[actionType], activeDaysData),
        onSuccess: (serveData) => {
            toast.success("Day is successfully edited!");
            // Save the data to the cache
            // queryClient.setQueryData(["activeDays"], (oldData) => oldData.map(option => option._id === serveData._id ? serveData : option));
            queryClient.invalidateQueries("activeDays");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutateAsync, mutate, isPending };
}

export { useEditActiveDaysQuery };