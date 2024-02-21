import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function useAddSkaterQuery() {
    const queryClient = useQueryClient();

    const addSkaterMutation = useMutation({
        enabled: false,
        mutationFn: (skaterData) => post(SERVER_ENDPOINTS.ADD_SKATER, skaterData),
        onSuccess: (skaterData) => {
            toast.success("Skater added successfully!");
            // Save the skater data to the cache
            queryClient.setQueryData(["skaters"], (oldData) => [...(oldData && Array.isArray(oldData) ? oldData : []), skaterData]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { addSkaterMutation };
}

export { useAddSkaterQuery };