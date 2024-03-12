import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./EquipmentList.module.css";

function EquipmentList() {
  const { path, newPath } = usePath();
  useEffect(() => newPath("equipment"), [newPath]);

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>Equipment</h3>

        <div className={styles.secondaryContainer}></div>
      </div>
    </>
  );
}

export default EquipmentList;
