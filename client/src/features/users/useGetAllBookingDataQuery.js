import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { get } from "../../api/api.js";

function useGetAllBookingDataQuery() {
  const { isLoading, isFetching, isError, error, data } = useQuery({
    queryKey: ["booking"],
    initialData: [],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_ALL_BOOKING),
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isLoading, isFetching, data };
}

export { useGetAllBookingDataQuery };
