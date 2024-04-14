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
import { useSetActiveInstructor } from "./useSetActiveInstructor.js";

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
  const { mutateAsync: addInstructor, isPending: addInstructorPending } =
    useSetActiveInstructor();

  const [instructor, setInstructor] = useState("");
  const [skatersIds, setSkatersIds] = useState([]);

  console.log(skatersIds);

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

    const ids = lessonsData.map((x) => x.skater._id);
    setSkatersIds((state) => (state = ids));
    setLesson({ title: title, lessonsData: lessonsData });
    // setInstructor(data.instructorId);
  }, [id, data]);

  return (
    <>
      <div className={styles.container}>
        <div className={styles.instructorContainer}>
          {/* ---------------- */}

          <div className={styles.element}>
            <select
              // name="protection"
              // id={`protection`}
              className={styles.select}
              defaultValue=""
              onChange={(e) => setInstructor(e.target.value)}
            >
              <option value="" disabled hidden></option>
              {/* <option value={"hasOwn"}>{lang.haveOwn}</option> */}
              {coachesList.map((coach) => (
                <option
                  key={coach._id}
                  value={coach._id}
                  selected={instructor === coach._id}
                >
                  {coach.firstName} {coach.lastName}
                </option>
              ))}
            </select>
            <label
              // htmlFor={`protection`}
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
