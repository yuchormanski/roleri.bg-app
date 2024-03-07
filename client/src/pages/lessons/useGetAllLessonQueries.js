import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { get } from "../../api/api.js";
import { SERVER_ENDPOINTS } from "../../services/environment.js";

function useGetAllLessonQueries() {
  const { isError, error, data, isFetching } = useQuery({
    queryKey: ["lessons"],
    queryFn: () => get(SERVER_ENDPOINTS.GET_ALL_LESSONS),
    initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { data, isFetching, error };
}

export { useGetAllLessonQueries };
