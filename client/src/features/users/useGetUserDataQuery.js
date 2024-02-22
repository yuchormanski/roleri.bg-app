import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { get } from "../../api/api.js";

function useGetUserDataQuery() {
    const { isLoading, isError, error, data } = useQuery({
        queryKey: ["user"],
        queryFn: async () => get(SERVER_ENDPOINTS.GET_USER),
        initialData: [],
    });

    if (isError) {
        toast.error(error.message);
    }

    return { isLoading, data };
}

export { useGetUserDataQuery };