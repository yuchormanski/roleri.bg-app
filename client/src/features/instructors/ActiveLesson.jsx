// import { useParams } from "react-router-dom";
import styles from "./ActiveLesson.module.css";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useLanguage } from "../../context/Language.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import SkaterElement from "./SkaterElement.jsx";

function ActiveLesson({ lessonsData }) {
  const { lang } = useLanguage();
  // const { id } = useParams();
  const { moveBack } = useMoveBack();

  // TODO: Add additional information for current lesson property is: additionalRequirements here or on the next component SkaterElement

  return (
    <>
      <div className={styles.container}>
        {/* <h3 className={styles.heading}>Lesson Name - TODO check how to be{id}</h3> */}

        <div className={styles.secondaryContainer}>
          {lessonsData.map((lesson) => (
            <SkaterElement lesson={lesson} key={lesson._id} />
          ))}
        </div>

        <div className={styles.hiddenOnMobile}>
          <Button type={"primary"} onClick={moveBack}>
            Back
          </Button>
        </div>
      </div>
    </>
  );
}

export default ActiveLesson;
