import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { post } from "../../api/api.js";

function useAddOptionsQuery(refreshState) {
    const queryClient = useQueryClient();

    const { mutate, isPending } = useMutation({
        enabled: false,
        mutationFn: (optionsData) => post(SERVER_ENDPOINTS.ADD_OPTIONS, optionsData),
        onSuccess: (optionsData) => {
            toast.success("Option added successfully!");
            // Save the skater data to the cache
            const { optionNameData, ...newData } = optionsData;
            queryClient.setQueryData(["skaters_options_data"], (oldData) => ({
                ...oldData,
                [optionNameData]: [...oldData[optionNameData], newData]
            }));

            queryClient.invalidateQueries("skaters_options_data");
            refreshState();
        },
        onError: (error) => {
            toast.error(error.message);
        },
    });

    return { mutate, isPending };
}

export { useAddOptionsQuery };