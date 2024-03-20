import { useParams } from "react-router-dom";
import styles from "./ActiveLesson.module.css";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useLanguage } from "../../context/Language.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import SkaterElement from "./SkaterElement.jsx";

// MOCKED DATA

const skatersList = [
  {
    _id: "jsdhfbusgdfg",
    firstName: "Gosho",
    lastName: "Petrov",
    skates: 31,
    protection: "M",
    requirements: null,
    instructorInfo: "",
  },
  {
    _id: "jsdhfbusgfdgddfg",
    firstName: "Stamat",
    lastName: "Spiridonov",
    skates: 41,
    protection: "L",
    requirements: "helmet",
    instructorInfo: "",
  },
  {
    _id: "jsdhusgdfg",
    firstName: "Gencho",
    lastName: "Hvalipratskov",
    skates: 36,
    protection: "S",
    requirements: null,
    instructorInfo: "lksdn;lk; popsd ",
  },
];

function ActiveLesson() {
  const { lang } = useLanguage();
  const { id } = useParams();
  const { moveBack } = useMoveBack();
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>Lesson Name - {id}</h3>

        <div className={styles.secondaryContainer}>
          {skatersList.map((skater) => (
            <SkaterElement skater={skater} key={skater._id} />
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
