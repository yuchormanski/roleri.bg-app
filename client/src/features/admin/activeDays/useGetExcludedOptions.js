import { useQuery } from "@tanstack/react-query";
import { SERVER_ENDPOINTS } from "../../../services/environment.js";
import { get } from "../../../api/api.js";
import toast from "react-hot-toast";

function useExcludedOptions() {
  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["excludedOptions"],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_EXCLUDED_OPTIONS),
    // initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isFetching, data };
}

export { useExcludedOptions };
