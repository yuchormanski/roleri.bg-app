import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { get } from "../../api/api.js";

function useGetOptionsQuery(actionType) {
  const endPoints = {
    skates: SERVER_ENDPOINTS.GET_SKATES_OPTIONS,
    protection: SERVER_ENDPOINTS.GET_PROTECTION_OPTIONS,
    level: SERVER_ENDPOINTS.GET_LEVEL_OPTIONS,
    age: SERVER_ENDPOINTS.GET_AGE_OPTIONS,
    subscription: SERVER_ENDPOINTS.GET_SUBSCRIPTION_OPTIONS,
  };

  const { isFetching, isError, error, data } = useQuery({
    queryKey: [actionType],
    queryFn: async () => get(endPoints[actionType]),
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isFetching, data };
}

export { useGetOptionsQuery };
