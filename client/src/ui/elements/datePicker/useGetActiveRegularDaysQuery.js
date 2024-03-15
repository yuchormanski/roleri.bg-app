import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { SERVER_ENDPOINTS } from "../../../services/environment.js";
import { get } from "../../../api/api.js";

function useGetActiveRegularDaysQuery() {

  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["regularDays"],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_ACTIVE_DAYS_REGULAR),
    initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isFetching, data };
}

export { useGetActiveRegularDaysQuery };
