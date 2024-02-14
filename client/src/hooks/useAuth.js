import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post } from "../api/api.js";
import { SERVER_ENDPOINTS } from "../services/environment.js";
import toast from "react-hot-toast";

function useAuth() {
    const queryClient = useQueryClient();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginMutation = useMutation({
        mutationFn: (userData) => post(SERVER_ENDPOINTS.LOGIN, userData),
        onSuccess: (userData) => {
            toast.success("Login success!");
            // Save the user data to the cache
            queryClient.setQueryData(["user"], userData);
            // Update isLoggedIn state
            setIsLoggedIn(true);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const registerMutation = useMutation({
        mutationFn: (userData) => post(SERVER_ENDPOINTS.REGISTER, userData),
        onSuccess: (userData) => {
            toast.success("Registration success!");
            // Save the user data to the cache
            queryClient.setQueryData(["user"], userData);
            // Update isLoggedIn state
            setIsLoggedIn(true);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    const logoutQuery = useQuery({
        queryFn: () => get(SERVER_ENDPOINTS.LOGOUT),
        onSuccess: () => {
            toast.success("Logout success!");
            // Clear the user data from the cache
            queryClient.removeQueries({ queryKey: "user" });
            // Update isLoggedIn state
            setIsLoggedIn(false);
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { loginMutation, registerMutation, logoutQuery, isLoggedIn };
}

export { useAuth };
