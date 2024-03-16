import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { post } from "../../../api/api.js";
import { SERVER_ENDPOINTS } from "../../../services/environment.js";

function useAddExcludedOptionsQuery(options) {
  const queryClient = useQueryClient();

  const { mutateAsync, mutate, isPending, isFetching } = useMutation({
    enabled: false,
    mutationFn: (options) =>
      post(SERVER_ENDPOINTS.ADD_EXCLUDED_OPTIONS, options),
    onSuccess: (options) => {
      toast.success("Option added successfully!");
      // Save the data to the cache
      queryClient.setQueryData(["excludedOptions"], options);
      queryClient.invalidateQueries(["excludedOptions"]);
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { mutateAsync, mutate, isPending, isFetching };
}

export { useAddExcludedOptionsQuery };
