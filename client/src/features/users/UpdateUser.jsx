import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./UpdateUser.module.css";

function UpdateUser() {
  const { path, newPath } = usePath();
  useEffect(() => newPath("edit"), [newPath]);

  return <div>Update user</div>;
}

export default UpdateUser;
