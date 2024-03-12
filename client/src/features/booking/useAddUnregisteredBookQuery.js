import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function useAddUnregisteredBookQuery() {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (bookData) => post(SERVER_ENDPOINTS.UNREGISTERED_BOOKING_USER, bookData),
        onSuccess: (bookData) => {
            toast.success("Booking added successfully!");
            // Save the booking data to the cache
            queryClient.setQueryData(["booking"], (oldData) => [...(oldData && Array.isArray(oldData) ? oldData : []), bookData]);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutate, isPending };
}

export { useAddUnregisteredBookQuery };