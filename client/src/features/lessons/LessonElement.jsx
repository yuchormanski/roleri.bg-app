import styles from "./LessonElement.module.css";

import { Link, useParams } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";
import { useMoveBack } from "../../hooks/useMoveBack.js";

import { useGetAllLessonQueries } from "../../pages/lessons/useGetAllLessonQueries.js";

import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useEffect, useState } from "react";

const mockedDays = {
  _id: "65f36cb405245d26529652a8",
  mon: false,
  tue: true,
  wed: false,
  thu: false,
  fri: false,
  sat: true,
  sun: false,
  start: "10:00",
  end: "16:30",
};

function LessonElement() {
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { id } = useParams();
  const { moveBack } = useMoveBack();
  const [activeDays, setActiveDays] = useState([]);
  const [activeHours, setActiveHours] = useState([]);

  const { data, isFetching, error } = useGetAllLessonQueries();
  let lesson = data.filter((el) => el._id === id).at(0);
  // console.log(lesson);

  useEffect(() => {
    const { _id, start, end, ...daysObj } = mockedDays;
    setActiveDays((state) => (state = daysObj));
    setActiveHours({ start, end });
  }, []);

  function wordModifier(day) {
    return day.at(0).toUpperCase() + day.slice(1).toLowerCase();
  }

  return (
    <>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.heading}>{translate(lesson?.title)}</h3>

          <div className={styles.secondaryContainer}>
            <section className={styles.section}>
              <div className={styles.imgContainer}>
                <img src={lesson.imageUrl} alt="Lesson base image" />
              </div>
              <div className={styles.infoBlock}>
                <h3 className={`${styles.infoElement} ${styles.lessonHeading}`}>
                  {/* <span>{lang.type}:</span> */}
                  {translate(lesson.type.typePayment)}
                </h3>

                <p className={styles.infoElement}>
                  <span>{lang.skills}:</span>
                  {translate(lesson.skills)}
                </p>

                <p className={styles.infoElement}>
                  <span>{lang.location}:</span>
                  {translate(lesson.location)}
                </p>

                <p className={styles.infoElement}>
                  <span>{lang.time}:</span>
                  {lesson.time}
                </p>

                <p className={styles.infoElement}>
                  <span>{lang.participants}:</span>
                  {lesson.participants}
                </p>

                <p className={styles.infoElement}>
                  <span>{lang.age}:</span>
                  {lesson.age.typeGroup} {lang.years}
                </p>

                {/* <p className={styles.infoElement}>
                  <span>{lang.price}:</span>
                  {lesson.price}
                </p> */}

                <p className={styles.infoElement}>
                  <span>{lang.validTo}:</span>
                  {new Date(lesson.validTo).toLocaleDateString("fr-CH")}
                </p>

                {/* <p className={styles.infoElement}>
                  <span>{lang.owner}:</span>
                  {lesson.owner.firstName} {lesson.owner.lastName}
                </p> */}

                {/* <p className={styles.infoElement}>
                  <span>{lang.createdAt}:</span>
                  {lesson.createdAt}
                </p> */}

                {/* //////////////////////////// */}

                <div className={styles.daysBlock}>
                  <p className={styles.containerInfo}>
                    Available days to sign individual lesson{" "}
                    {Object.values(activeDays).filter((x) => x).length === 1
                      ? "is"
                      : "are"}
                  </p>
                  <div className={styles.daysContainer}>
                    {Array.from({ length: 7 }, (_, i) => (
                      <DayName
                        key={i}
                        isValid={Object.values(activeDays).at(i)}
                        text={wordModifier(Object.keys(activeDays).at(i))}
                      />
                    ))}
                  </div>

                  <p className={styles.containerInfo}></p>
                  <div className={styles.hoursContainer}>
                    <p className={styles.hourElement}>{activeHours.start}</p>
                    <span className={styles.hoursSeparator}>-</span>
                    <p className={styles.hourElement}>{activeHours.end}</p>
                  </div>
                </div>
                {/* /////////////////////////// */}
              </div>
            </section>
            <p className={`${styles.infoElement} ${styles.description}`}>
              <span></span>
              {translate(lesson.description)}
            </p>

            {lesson.isIndividual && (
              <div className={styles.individualContainer}>
                <h3>
                  Индивидуалните уроци се провеждат и уговарят директно с
                  инструктора.
                </h3>
                <p>
                  В настоящия момент възможните дни за провеждане на
                  индивидуален урок са сряда и петък, във времевия интервал
                  между 12:00 и 16:00 часа
                </p>
              </div>
            )}

            <div className={styles.btnContainer}>
              <button className={styles.btn} onClick={moveBack}>
                {lang.back}
              </button>
              {lesson.isIndividual ? null : (
                <Link className={styles.link} to={"/booking"}>
                  {lang.booking}
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LessonElement;

function DayName({ isValid, text }) {
  return (
    <p
      className={`${styles.dayBox} ${
        isValid ? styles.activeDay : styles.inactiveDay
      }`}
    >
      {text}
    </p>
  );
}
