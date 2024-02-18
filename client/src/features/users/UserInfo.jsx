import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./UserInfo.module.css";
import { PiUserThin } from "react-icons/pi";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

function UserInfo() {
  const { path, newPath } = usePath();

  const {
    isLoading,
    data: lessons,
    error,
  } = useQuery({
    queryKey: ["signedLessons"],
    queryFn: () => null,
  });

  useEffect(() => newPath("profile"), [newPath]);
  console.log(lessons);
  return (
    <>
      {lessons === null && <h3>You have no active lessons.</h3>}
      <p>Трябва да се зарежда информация дали има предстоящи записани уроци.</p>
    </>
  );
}

export default UserInfo;
