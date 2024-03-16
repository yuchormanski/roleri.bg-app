import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function useAddRegisteredBookQuery() {
    const queryClient = useQueryClient();

    const { mutateAsync, mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (bookData) => post(SERVER_ENDPOINTS.REGISTERED_BOOKING_USER, bookData),
        onSuccess: (bookData) => toast.success("Booking added successfully!"),
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutateAsync, mutate, isPending };
}

export { useAddRegisteredBookQuery };