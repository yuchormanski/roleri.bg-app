import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { put } from "../../api/api.js";

function useEditOptionsQuery(actionType) {
    const endPoints = {
        skates: SERVER_ENDPOINTS.EDIT_SKATES_OPTIONS,
        protection: SERVER_ENDPOINTS.EDIT_PROTECTION_OPTIONS,
        age: SERVER_ENDPOINTS.EDIT_AGE_OPTIONS,
        subscription: SERVER_ENDPOINTS.EDIT_SUBSCRIPTION_OPTIONS,
        lessons: SERVER_ENDPOINTS.EDIT_LESSON,
    }

    const queryClient = useQueryClient();

    const { mutateAsync, mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (optionsData) => put(endPoints[actionType], optionsData),
        onSuccess: (optionsData) => {
            toast.success("Option edited successfully!");
            // Save the data to the cache
            queryClient.setQueryData([actionType], (oldData) => oldData.map(option => option._id === optionsData._id ? optionsData : option));
            queryClient.invalidateQueries(actionType);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutateAsync, mutate, isPending };
}

export { useEditOptionsQuery };