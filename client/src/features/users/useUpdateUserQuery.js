import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";
import { useAuthContext } from "../../context/AuthContext.jsx";

import { useMoveBack } from "../../hooks/useMoveBack.js";
import { put } from "../../api/api.js";

function useUpdateUserQuery() {
    const queryClient = useQueryClient();
    const { addUserHandler } = useAuthContext();

    const { redirectTo } = useMoveBack();

    const updateUserMutation = useMutation({
        enabled: false,
        mutationFn: (userData) => put(SERVER_ENDPOINTS.UPDATE_USER, userData),
        onSuccess: (userData) => {
            toast.success("User updated!");
            // Save the user data to the cache
            queryClient.setQueryData(["user"], userData);
            // Save the user data to local storage
            addUserHandler(userData);

            redirectTo("/profile");
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { updateUserMutation };
}

export { useUpdateUserQuery };