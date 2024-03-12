import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function useAddOptionsQuery(actionType) {
    const endPoints = {
        skates: SERVER_ENDPOINTS.ADD_SKATES_OPTIONS,
        protection: SERVER_ENDPOINTS.ADD_PROTECTION_OPTIONS,
        age: SERVER_ENDPOINTS.ADD_AGE_OPTIONS,
        subscription: SERVER_ENDPOINTS.ADD_SUBSCRIPTION_OPTIONS,
        lessons: SERVER_ENDPOINTS.ADD_LESSON,
    }

    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (optionsData) => post(endPoints[actionType], optionsData),
        onSuccess: (optionsData) => {
            toast.success("Option added successfully!");
            // Save the data to the cache
            queryClient.setQueryData([actionType], (oldData) => [...(oldData && Array.isArray(oldData) ? oldData : []), optionsData]);
            queryClient.invalidateQueries(actionType);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutate, isPending };
}

export { useAddOptionsQuery };