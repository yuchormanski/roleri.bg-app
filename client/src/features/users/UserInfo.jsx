import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./UserInfo.module.css";
import { useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "../../context/Language.jsx";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";

function UserInfo() {
  const { path, newPath } = usePath();
  const { lang } = useLanguage();
  let isWorking = true;

  // const queryClient = useQueryClient();

  const { getUserHandler } = useAuthContext();
  const data = getUserHandler();
  if (data) {
    isWorking = false;
  }

  // const { isFetching, data, error } = useQuery({
  //   queryKey: ["user"],

  //   queryFn: () => {
  //     if (!data) {
  //       return get(SERVER_ENDPOINTS.GET_USER);
  //     }
  //     return data;
  //   },
  // });
  const lessons = {};

  useEffect(() => newPath("profile"), [newPath]);
  return (
    <>
      {isWorking
        ? (
          <Spinner />
        ) : (
          <div className={styles.container}>
            <h3 className={styles.heading}>
              {`${data?.firstName} ${data?.lastName}'s ${lang.dashboard}`}
            </h3>
            {lessons && <h3>You have no active lessons.</h3>}
            <p>
              Трябва да се зарежда информация дали има предстоящи записани уроци.
            </p>
          </div >
        )
      }
    </>
  );
}

export default UserInfo;
