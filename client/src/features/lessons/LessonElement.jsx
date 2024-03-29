import styles from "./LessonElement.module.css";

import { Link, useParams } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";
import { useTranslate } from "../../hooks/useTranslate.js";
import { useMoveBack } from "../../hooks/useMoveBack.js";

import { useGetAllLessonQueries } from "../../pages/lessons/useGetAllLessonQueries.js";

import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function LessonElement() {
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();
  const { id } = useParams();
  const { moveBack } = useMoveBack();

  const { data, isFetching, error } = useGetAllLessonQueries();
  let lesson = data.filter((el) => el._id === id).at(0);
  console.log(lesson);

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

// {
//     "geoLocation": {
//         "lat": null,
//         "lon": null
//     },
//     "_id": "65e8a990c7dc5ca7725341f9",
//     "imageUrl": "https://roleri.bg/wp-content/uploads/2015/10/beginers_group_winter-300x235.jpg",
//     "title": "Група Начинаещи&/&Group Beginners",
//     "age": {
//         "_id": "65e314955af625ebe17c483a",
//         "typeGroup": "4 - 6"
//     },
//     "skills": "Правилна стойка; Спиране&/&Correct position; Brakeing",
//     "participants": 10,
//     "type": {
//         "_id": "65e1025312e6f21c66948431",
//         "typePayment": "Единичен групов урок&/&One time group lesson",
//         "price": 25
//     },
//     "location": "София, България&/&Sofia, Bulgaria",
//     "price": "20",
//     "description": "Когато господарят им става жертва на коварния Кира, който отнема земите му, 47 самураи са унижени и прогонени от домовете си.&/&Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
//     "time": "10:04",
//     "validTo": "2028-12-06T00:00:00.000Z",
//     "owner": {
//         "_id": "65d1e25875c58bac29f86ea7",
//         "firstName": "Van",
//         "lastName": "Deribohten"
//     },
//     "createdAt": "2024-03-06T17:36:16.047Z",
//     "updatedAt": "2024-03-06T17:36:16.047Z",
//     "__v": 0
// }
