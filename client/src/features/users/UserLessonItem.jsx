import styles from "./UserLessonItem.module.css";

import { useTranslate } from "../../hooks/useTranslate.js";
import { PiCheckBold, PiCheck, PiX, PiXBold } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useLanguage } from "../../context/Language.jsx";

function UserLessonItem({ bookedLesson, rejectLessonHandler }) {
  const { translatePhrase: translate } = useTranslate();
  const { lang } = useLanguage();
  const { lessonId, skaterId, subscriptionId, ...bookingMainData } =
    bookedLesson;

  // const bookingData = bookingMainData.sort(
  //   (a, b) => new Date(a.date) - new Date(b.date)
  // );

  return (
    <figure className={styles.figure} key={skaterId._id}>
      <header className={styles.header}>
        <h3
          className={styles.figureHeading}
        >{`${skaterId.firstName} ${skaterId.lastName}`}</h3>
        <Link to={`/lesson/${lessonId._id}`} className={styles.link}>
          {translate(lessonId.title)}
        </Link>
      </header>
      <div className={styles.infoContainer}>
        <div className={styles.info}>
          <p className={styles.paragraph}>
            <span className={styles.span}>{lang.date}</span>
            {new Date(bookingMainData.date).toLocaleDateString("fr-CH")}
          </p>
          <p className={styles.paragraph}>
            <span className={styles.span}>{lang.time}</span>
            {lessonId.time}
          </p>
          <p className={styles.paragraph}>
            <span className={styles.span}>{lang.type}</span>
            {translate(subscriptionId.typePayment)}
          </p>
          {subscriptionId.typePayment === "Абонамент&/&Subscription" && (
            <p className={styles.paragraph}>
              <span className={styles.span}>{lang.sequence}</span>
              {bookingMainData.lessonIndex}
            </p>
          )}
        </div>
        <div className={styles.reject}>
          <span>{lang.reject}</span>
          <button
            className={styles.inNotOK}
            onClick={() => rejectLessonHandler(bookingMainData._id)}
          >
            <PiX />
          </button>
        </div>
      </div>
    </figure>
  );
}

export default UserLessonItem;

// const t = {
//   _id: "65f558cded98d5e16a09442f",
//   date: "2024-03-23T22:00:00.000Z",
//   isPresent: false,
//   isPaid: false,
//   isRejected: false,
//   additionalRequirements: "",
//   lessonIndex: 1,
//   lessonId: {
//     geoLocation: { lat: null, lon: null },
//     _id: "65e8a990c7dc5ca7725341f9",
//     imageUrl:
//       "https://roleri.bg/wp-content/uploads/2015/10/beginers_group_winter-300x235.jpg",
//     title: "Група Начинаещи&/&Group Beginners",
//     age: "65e314955af625ebe17c483a",
//     skills: "Правилна стойка; Спиране&/&Correct position; Brakeing",
//     participants: 10,
//     type: "65e1025312e6f21c66948431",
//     location: "София, България&/&Sofia, Bulgaria",
//     price: "20",
//     description:
//       "Когато господарят им става жертва на коварния Кира, който отнема земите му, 47 самураи са унижени и прогонени от домовете си.&/&Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec qu",
//     time: "10:04",
//     validTo: "2028-12-06T00:00:00.000Z",
//     owner: "65d1e25875c58bac29f86ea7",
//     createdAt: "2024-03-06T17:36:16.047Z",
//     updatedAt: "2024-03-06T17:36:16.047Z",
//   },
//   skaterId: {
//     imageURL: null,
//     imageId: null,
//     _id: "65db8bbb2d9fb1956d8125c8",
//     firstName: "Генчо",
//     lastName: "Георгиев",
//     age: 12,
//     gender: "male",
//     additionalRequirements:
//       "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. ",
//     skatesSize: "65db56c1fe2b293bd5dfbc58",
//     protection: "65db1b3676399aba3ebb5af0",
//     groupLevel: "65db89c42d9fb1956d812565",
//     owner: "65d1e25875c58bac29f86ea7",
//     courseHistory: [],
//     createdAt: "2024-02-25T18:49:31.470Z",
//     updatedAt: "2024-02-25T18:49:31.470Z",
//   },
//   subscriptionId: {
//     _id: "65e1025312e6f21c66948431",
//     typePayment: "Единичен групов урок&/&One time group lesson",
//     price: 25,
//     createdAt: "2024-02-29T22:16:51.813Z",
//     updatedAt: "2024-03-05T17:07:58.702Z",
//     " subscriptionCount": 1,
//   },
//   owner: "65d1e25875c58bac29f86ea7",
//   __v: 0,
//   createdAt: "2024-03-16T08:31:09.241Z",
//   updatedAt: "2024-03-16T08:31:59.093Z",
// };
