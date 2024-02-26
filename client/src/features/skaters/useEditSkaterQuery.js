import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { put } from "../../api/api.js";

function useEditSkaterQuery() {
    const queryClient = useQueryClient();

    const editSkaterMutation = useMutation({
        enabled: false,
        mutationFn: (skaterData) => put(SERVER_ENDPOINTS.EDIT_SKATER, skaterData),
        onSuccess: (skaterData) => {
            toast.success("Skater updated successfully!");
            // Save the skater data to the cache
            queryClient.setQueryData(["skaters"], (oldData) => oldData.map(skater => skater._id === skaterData._id ? skaterData : skater));

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { editSkaterMutation };
}

export { useEditSkaterQuery };