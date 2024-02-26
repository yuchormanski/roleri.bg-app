import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { del } from "../../api/api.js";

function useDeleteSkaterQuery() {
    const queryClient = useQueryClient();

    const deleteSkaterMutation = useMutation({
        enabled: false,
        mutationFn: (skaterData) => del(SERVER_ENDPOINTS.DELETE_SKATER(skaterData._id)),
        onSuccess: (skaterData) => {
            toast.success("Skater deleted successfully!");
            // Save the skater data to the cache
            queryClient.setQueryData(["skaters"], oldData => oldData.filter(skater => skater._id !== skaterData._id));

        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { deleteSkaterMutation };
}

export { useDeleteSkaterQuery };