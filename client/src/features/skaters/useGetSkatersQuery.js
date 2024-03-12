import toast from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

import { SERVER_ENDPOINTS } from "../../services/environment.js";

import { get } from "../../api/api.js";

function useGetSkatersQuery() {
  const { isFetching, isError, error, data } = useQuery({
    queryKey: ["skaters"],
    queryFn: async () => get(SERVER_ENDPOINTS.GET_ALL_USER_SKATERS),
    initialData: [],
  });
  // console.log(data);

  return { isFetching, isError, error, data };
}

export { useGetSkatersQuery };
