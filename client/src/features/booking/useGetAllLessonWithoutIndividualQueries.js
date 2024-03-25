import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { get } from "../../api/api.js";
import { SERVER_ENDPOINTS } from "../../services/environment.js";

function useGetAllLessonWithoutIndividualQueries() {
  const { isError, error, data, isFetching } = useQuery({
    queryKey: ["lessons-without-individual"],
    queryFn: () => get(SERVER_ENDPOINTS.GET_ALL_LESSONS_WITHOUT_INDIVIDUAL),
    initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { data, isFetching, error };
}

export { useGetAllLessonWithoutIndividualQueries };
