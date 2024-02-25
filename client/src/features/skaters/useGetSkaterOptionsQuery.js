import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { get } from "../../api/api.js";

function useGetSkaterOptionsQuery() {
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["skaters_options_data"],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_ALL_OPTIONS),
    initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isLoading, data };
}

export { useGetSkaterOptionsQuery };
