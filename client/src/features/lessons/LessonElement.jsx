import { useParams } from "react-router-dom";
import styles from "./LessonElement.module.css";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";
import { useMoveBack } from "../../hooks/useMoveBack.js";

function LessonElement() {
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { id } = useParams();
  const { moveBack } = useMoveBack();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["lessons"]);
  const lesson = data.filter((el) => el._id === id);
  const { title, imageUrl } = lesson.at(0);
  console.log(lesson);

  return (
    <>
      <div>{translate(title)}</div>
      <button onClick={moveBack}>Back</button>
    </>
  );
}

export default LessonElement;
