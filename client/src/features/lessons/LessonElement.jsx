import styles from "./LessonElement.module.css";

import { Link, useParams } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";
import { useMoveBack } from "../../hooks/useMoveBack.js";

import { useGetAllLessonQueries } from "../../pages/lessons/useGetAllLessonQueries.js";

import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { useEffect, useState } from "react";

import { PiPhoneOutgoingThin, PiPhoneOutgoing } from "react-icons/pi";
import { useGetIndividualsDays } from "./useGetIndividualsDays.js";
import { useGetAllOnDuty } from "../../pages/lessons/useGetAllOnDuty.js";

function LessonElement() {
  const { isFetching: isLoading, data: availableDays } =
    useGetIndividualsDays();
  const { data, isFetching } = useGetAllLessonQueries();
  const { data: onDutyStuff, isFetching: isFetchingOnDutyStuff } = useGetAllOnDuty();

  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { id } = useParams();
  const { moveBack } = useMoveBack();

  const [activeDays, setActiveDays] = useState([]);
  const [activeHours, setActiveHours] = useState([]);

  let lesson = data.filter((el) => el._id === id).at(0);

  useEffect(() => {
    if (isLoading) return;
    const { _id, start, end, ...daysObj } = availableDays;
    setActiveDays((state) => (state = daysObj));
    setActiveHours({ start, end });
  }, [availableDays, isLoading]);

  function wordModifier(day) {
    if (!day) return;
    return day.at(0).toUpperCase() + day.slice(1).toLowerCase();
  }

  return (
    <>
      {isFetching || isLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          {<h3 className={styles.heading}>{translate(lesson?.title)}</h3>}

          <div className={styles.secondaryContainer}>
            <section className={styles.section}>
              <div className={styles.imgContainer}>
                <img src={lesson.imageUrl} alt="Lesson base image" />
              </div>
              <div className={styles.infoBlock}>
                {lesson.isIndividual ? null : (
                  <h3
                    className={`${styles.infoElement} ${styles.lessonHeading}`}
                  >
                    {translate(lesson.type.typePayment)}
                  </h3>
                )}
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

                {/* INDIVIDUAL DAYS */}
                {lesson.isIndividual && (
                  <>
                    <div className={styles.individualContainer}>
                      <h3>{lang.l_info_1}</h3>

                      <div className={styles.daysBlock}>
                        <p className={styles.head}>
                          Available days to sign individual lesson{" "}
                          {Object.values(activeDays).filter((x) => x).length ===
                            1
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
                          <p className={styles.hourElement}>
                            {activeHours.start}
                          </p>
                          <span className={styles.hoursSeparator}>-</span>
                          <p className={styles.hourElement}>
                            {activeHours.end}
                          </p>
                        </div>
                      </div>

                      <div className={styles.instructorsContainer}>
                        <p className={styles.head}>Instructors on duty are:</p>
                        {onDutyStuff.map( x =>
                          <p key={x._id} className={styles.element}>
                            {`${x.firstName} ${x.lastName}`} &#9866;
                            {
                              <>
                                <span>
                                  <PiPhoneOutgoing />
                                </span>
                                <Link
                                  className={styles.elLink}
                                  to="#"
                                  onClick={(e) => {
                                    window.location = `callTo:${x.phone}`;
                                    e.preventDefault();
                                  }}
                                >
                                  {x.phone}
                                </Link>
                              </>
                            }
                          </p>
                        )}
                      </div>
                    </div>
                  </>
                )}
                {/* END INDIVIDUAL DAYS */}
              </div>
            </section>
            <p className={`${styles.infoElement} ${styles.description}`}>
              <span></span>
              {translate(lesson.description)}
            </p>

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
      className={`${styles.dayBox} ${isValid ? styles.activeDay : styles.inactiveDay
        }`}
    >
      {text}
    </p>
  );
}
