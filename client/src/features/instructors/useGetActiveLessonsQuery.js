import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { get } from "../../api/api.js";

function useGetActiveLessonsQuery() {

  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["lessonsActive"],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_COACH_LESSONS),
    // initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { isFetching, data };
}

export { useGetActiveLessonsQuery };
