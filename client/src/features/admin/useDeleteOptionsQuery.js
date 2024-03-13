import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { del } from "../../api/api.js";

function useDeleteOptionsQuery(actionType) {
    const endPoints = {
        skates: SERVER_ENDPOINTS.DELETE_SKATES_OPTIONS,
        protection: SERVER_ENDPOINTS.DELETE_PROTECTION_OPTIONS,
        age: SERVER_ENDPOINTS.DELETE_AGE_OPTIONS,
        subscription: SERVER_ENDPOINTS.DELETE_SUBSCRIPTION_OPTIONS,
        lessons: SERVER_ENDPOINTS.DELETE_LESSON,
    }

    const queryClient = useQueryClient();

    const { mutateAsync, mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (optionData) => del(endPoints[actionType](optionData._id)),
        onSuccess: (optionData) => {
            toast.success("Option deleted successfully!");
            // Save the data to the cache
            queryClient.setQueryData([actionType], oldData => oldData.filter(skates => skates._id !== optionData._id));
            queryClient.invalidateQueries(actionType);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutateAsync, mutate, isPending };
}

export { useDeleteOptionsQuery };