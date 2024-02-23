import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { del } from "../../api/api.js";

function useDeleteOptionsQuery(actionType) {
    const endPoints = {
        skates: SERVER_ENDPOINTS.DELETE_SKATES_OPTIONS,
        protection: SERVER_ENDPOINTS.DELETE_PROTECTION_OPTIONS,
        level: SERVER_ENDPOINTS.DELETE_LEVEL_OPTIONS,
        age: SERVER_ENDPOINTS.DELETE_AGE_OPTIONS,
        subscription: SERVER_ENDPOINTS.DELETE_SUBSCRIPTION_OPTIONS,
    }

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (skatesData) => del(endPoints[actionType](skatesData._id)),
        onSuccess: (skatesData) => {
            toast.success("Option deleted successfully!");
            // Save the data to the cache
            queryClient.setQueryData([actionType], oldData => oldData.filter(skates => skates._id !== skatesData._id));
            queryClient.invalidateQueries(actionType);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutate, isPending };
}

export { useDeleteOptionsQuery };