import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { get } from "../../api/api.js";

function useGetUserDataQuery() {
  const { isLoading, isFetching, isError, error, data } = useQuery({
    queryKey: ["user"],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_USER),
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isLoading, isFetching, data };
}

export { useGetUserDataQuery };
