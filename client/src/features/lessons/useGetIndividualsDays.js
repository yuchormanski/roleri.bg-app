import { useQuery } from "@tanstack/react-query";
import { get } from "../../api/api.js";
import { SERVER_ENDPOINTS } from "../../services/environment.js";
import toast from "react-hot-toast";

function useGetIndividualsDays() {
  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["individual-lessons-days"],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_ACTIVE_DAYS_INDIVIDUAL),
    initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isFetching, data };
}

export { useGetIndividualsDays };
