import toast from "react-hot-toast";
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { post } from '../api/api.js';
import { SERVER_ENDPOINTS } from '../services/environment.js';

export function useRegister() {
    const queryClient = useQueryClient();
    const { isLoading, mutate } = useMutation({
        mutationFn: post(SERVER_ENDPOINTS.REGISTER),
        onSuccess: () => {
            toast.success('URA');
            queryClient.invalidateQueries({ queryKey: ['user'] });
        },
        onError: (error) => { toast.error(error.message); }
    });

    return { isLoading, mutate };
}