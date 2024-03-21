import { useParams } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import styles from "./ActiveLesson.module.css";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useLanguage } from "../../context/Language.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import SkaterElement from "./SkaterElement.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";

function ActiveLesson() {
  const { lang } = useLanguage();
  const { id } = useParams();
  const { moveBack } = useMoveBack();
  const { translatePhrase: translate } = useTranslate();

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["lessonsActive"])

  const foundData = Object.entries(data).reduce((acc, [k, v]) => {
    if (v._id === id) {
      acc.push({ title: k, data: v.data });
    }

    return acc;
  }, []);

  const { title, data: lessonsData } = foundData[0];

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{translate(title)}</h3>

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
