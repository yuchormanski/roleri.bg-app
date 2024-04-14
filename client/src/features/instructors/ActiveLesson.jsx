import styles from "./ActiveLesson.module.css";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useMoveBack } from "../../hooks/useMoveBack.js";
import { useLanguage } from "../../context/Language.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import SkaterElement from "./SkaterElement.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";

import { GoIssueOpened } from "react-icons/go";
import { PiSuitcaseRolling } from "react-icons/pi";
import { useGetOptionsQuery } from "../admin/useGetOptionsQuery.js";

// mocked data
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function ActiveLesson() {
  const [{ title, lessonsData }, setLesson] = useState({});
  const { lang } = useLanguage();
  const { id } = useParams();
  const { moveBack, redirectTo } = useMoveBack();
  const { translatePhrase: translate } = useTranslate();

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData(["lessonsActive"]);
  const { isFetching, data: coachesList } = useGetOptionsQuery("coaches");
  const [instructor, setInstructor] = useState("");

  console.log(coachesList);

  useEffect(() => {
    if (!data) {
      redirectTo("/on-duty");
      return;
    }

    const foundData = Object.entries(data).reduce((acc, [k, v]) => {
      if (v._id === id) {
        acc.push({ title: k, data: v.data });
      }
      return acc;
    }, []);

    const { title, data: lessonsData } = foundData.at(0);
    setLesson({ title: title, lessonsData: lessonsData });
  }, [id, data]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.instructorContainer}>
          {/* ---------------- */}

          <div className={styles.element}>
            <select
              name="protection"
              id={`protection`}
              className={styles.select}
              defaultValue=""
              onChange={(e) => setInstructor(e.target.value)}
            >
              <option value="" disabled hidden></option>
              {/* <option value={"hasOwn"}>{lang.haveOwn}</option> */}
              {coachesList.map((protection) => (
                <option key={protection._id} value={protection._id}>
                  {Number(protection.size) === 0
                    ? lang.haveOwn
                    : protection.size}
                </option>
              ))}
            </select>
            <label
              htmlFor={`protection`}
              className={`${styles.selectLabel}
              ${instructor ? styles.filled : null}
              `}
            >
              <span>{lang.instructors}</span>
            </label>
          </div>

          {/* ---------------- */}
          <h3 className={styles.heading}>{title && translate(title)}</h3>
        </div>
        <div className={styles.secondaryContainer}>
          {lessonsData &&
            lessonsData.map((lesson) => (
              <SkaterElement lesson={lesson} key={lesson._id} />
            ))}
        </div>
        <div className={styles.hiddenOnMobile}>
          <Button type={"primary"} onClick={moveBack}>
            Back
          </Button>
        </div>
        <section className={styles.description}>
          <p className={styles.info}>
            <span>
              <GoIssueOpened />
            </span>
            {<PiSuitcaseRolling />} - {lang.l_activeLesson_info_1}
          </p>
        </section>
      </div>
    </>
  );
}

export default ActiveLesson;
