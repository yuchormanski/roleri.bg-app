import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { get } from "../../api/api.js";
import { SERVER_ENDPOINTS } from "../../services/environment.js";

function useGetAllOnDuty() {
  const { isError, error, data, isFetching } = useQuery({
    queryKey: ["onDuty"],
    queryFn: () => get(SERVER_ENDPOINTS.GET_ALL_ON_DUTY_USERS),
    initialData: [],
  });

  if (isError) {
    toast.error(error.message);
  }

  return { data, isFetching, error };
}

export { useGetAllOnDuty };
