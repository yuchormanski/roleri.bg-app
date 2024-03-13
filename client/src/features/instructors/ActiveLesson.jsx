import { useParams } from "react-router-dom";
import styles from "./ActiveLesson.module.css";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useLanguage } from "../../context/Language.jsx";
import Button from "../../ui/elements/button/Button.jsx";

function ActiveLesson() {
  const { lang } = useLanguage();
  const { id } = useParams();
  const { moveBack } = useMoveBack();
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>Lesson Name - {id}</h3>

        <div className={styles.secondaryContainer}>
          тук: Лист със всички участници в този урок
        </div>

        <Button type={"primary"} onClick={moveBack}>
          Back
        </Button>
      </div>
    </>
  );
}

export default ActiveLesson;
