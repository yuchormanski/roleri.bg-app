import styles from "./RegisteredUser.module.css";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
import { useLanguage } from "../../context/Language.jsx";
import { useGetSkatersQuery } from "../skaters/useGetSkatersQuery.js";
// import { useGetUserDataQuery } from "../users/useGetUserDataQuery.js";
import { useGetSkaterOptionsQuery } from "../skaters/useGetSkaterOptionsQuery.js";
// import { useGetAllLessonQueries } from "../../pages/lessons/useGetAllLessonQueries.js";
import { useGetAllValidLessonQueries } from "./useGetAllValidLessonsQuery.js";
import { useAddRegisteredBookQuery } from "./useAddRegisteredBookQuery.js";
import { useTranslate } from "../../hooks/useTranslate.js";
import Button from "../../ui/elements/button/Button.jsx";
import toast from "react-hot-toast";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function RegisteredUser() {
  const { lang, index: selectedLangIndex } = useLanguage();

  const { translatePhrase: translate } = useTranslate();
  const [selectedDate, setSelectedDate] = useState();
  const [sign, setSign] = useState([]);
  const [additional, setAdditional] = useState("");
  const navigate = useNavigate();

  // const { isFetching: userLoading, data: user } = useGetUserDataQuery();

  const { isFetching: isSkatersLoading, data: skaters } = useGetSkatersQuery();
  const { isFetching: isOptionsLoading, data: optionData } =
    useGetSkaterOptionsQuery();
  const { isFetching: isLessonsLoading, data: incoming } =
    useGetAllValidLessonQueries();
  const { mutateAsync, isPending: isAddBookingLoading } =
    useAddRegisteredBookQuery();

  const lessonData = incoming.filter((el) => new Date(el.validTo) > new Date());

  // SELECTING DATE
  function selectedDateHandler(date) {
    setSelectedDate((d) => (d = date));
  }

  // SELECTING SKATER
  function checkboxHandler(e, id) {
    if (e.target.checked) {
      setSign((arr) => [...arr, { skaterId: id }]);
    } else {
      setSign((arr) => arr.filter((el) => el.skaterId !== id));
    }
  }

  // SELECTING LESSONS TYPE & LESSON
  function selection(e, skaterId) {
    const skaterObj = sign.filter((s) => s.skaterId === skaterId).at(0);
    skaterObj[e.target.name] = e.target.value;
    setSign((state) => (state = [...sign]));
  }
  // FINISHING REQUEST
  async function bookHandler() {
    // hardcoded disable validation
    if (!selectedDate && sign.length === 0) {
      return toast.error("You should fill the form!");
    }

    // if not selected date
    if (!selectedDate) {
      return toast.error("You should choose a date!");
    }
    if (sign.length === 0) {
      console.log(sign.length);
      return toast.error("You should make a selection!");
    }

    // if selected date is before the current
    if (new Date(selectedDate) < new Date()) {
      return toast.error("The selected date is before the current!");
    }

    // preview on date
    // const lessonDate = selectedDate.toDateString();
    // const result = sign
    //     .map((s) => {
    //         if (!!s.skaterId && !!s.subscriptionType && !!s.lessonId) return true;
    //         else return false;
    //     })
    //     .every((x) => x);

    // const result = sign.filter((s) => !!s.skaterId && !!s.subscriptionType && !!s.lessonId);

    const dataToServer = sign.reduce((acc, valueObj) => {
      return !!valueObj.skaterId &&
        !!valueObj.subscriptionType &&
        !!valueObj.lessonId
        ? [
            ...acc,
            {
              ...valueObj,
              date: selectedDate,
              additionalRequirements: additional,
            },
          ]
        : acc;
    }, []);

    if (dataToServer.length > 0) {
      try {
        await mutateAsync(dataToServer);

        navigate("/profile");
      } catch (error) {
        console.log(error.message);
      } finally {
        setSign([]);
      }
    } else return toast.error("You should select all option for skater");
  }

  // HELPER
  function hasSkater(id) {
    return sign.find((s) => s.skaterId === id);
  }
  return (
    <>
      {" "}
      {isSkatersLoading ||
      isOptionsLoading ||
      isLessonsLoading ||
      isAddBookingLoading ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          <h3 className={styles.heading}>{lang.bookLesson}</h3>

          <div className={styles.secondaryContainer}>
            <div className={styles.leftPanel}>
              <p className={styles.headInfo}>
                {lang.book_headInfo_1}
                <Link className={styles.link} to={"/lessons"}>
                  {lang.lessons.toLowerCase()}
                </Link>{" "}
                {lang.book_headInfo_2}
                <Link
                  className={styles.link}
                  to="http://roleri.bg/rollwp/plans/"
                >
                  {lang.schedule.toLowerCase()}
                </Link>
              </p>
              <h2 className={styles.secondaryHeading}>
                {lang.book_sec_heading_1}
              </h2>
              <h3 className={styles.thirdHeading}>Стъпка 1</h3>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Изберете ден, маркиран в зелено, името на участника, вида на
                урока и групата, в която ще се включи.
              </p>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Ако изберете Абонамент, това означава,че ще ползвате пакет от
                четири урока, взети в рамките на четири поредни седмици в
                съответния ден (Ще се отрази при преглед на профила Ви)..
              </p>

              <h3 className={styles.thirdHeading}>Стъпка 2</h3>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Изпратете Вашата форма. Ще получите потвърждение на Вашето
                участие на посоченият e-mail адрес.
              </p>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                При лошо време урока се прехвърля за следващата дата.{" "}
              </p>
              <p className={styles.paragraph}>
                <span>&#9737;</span>
                Ако по някаква причина не можете да използвате оборудването,
                което сте заявили при регистрацията си, напишете го в полето
                &apos;Допълнително&apos;
              </p>
            </div>

            <div className={styles.rightPanel}>
              <h3 className={styles.secondaryHeading}>
                {lang.book_sec_heading_2}
              </h3>
              <DatePickerCalendar selectedDateProp={selectedDateHandler} />

              {console.log(skaters)}
              {skaters.length === 0 ? (
                <div className={styles.noSkatersContainer}>
                  <h3 className={styles.secondaryHeading}>
                    <p>{lang.regBookInfo_1}</p>
                    <Link
                      to={"/profile/skaters"}
                      className={styles.noSkatersLink}
                    >
                      {lang.add_skater}
                    </Link>
                  </h3>
                </div>
              ) : (
                <>
                  <h3 className={styles.secondaryHeading}>
                    {lang.select_skaters}
                  </h3>
                  <div className={` ${styles.userChoice} `}>
                    {skaters.map((s) => (
                      <div className={styles.skaterWrapper} key={s._id}>
                        <div className={styles.skaterContainer}>
                          <p
                            className={styles.skaterName}
                          >{`${s.firstName} ${s.lastName}`}</p>
                          <input
                            className={styles.skaterSelection}
                            type="checkbox"
                            onChange={(e) => checkboxHandler(e, s._id)}
                          />
                        </div>

                        <div className={styles.selectContainer}>
                          <div className={styles.label}>
                            <label
                              htmlFor={`${s._id}-lessonId`}
                              className={
                                hasSkater(s._id)
                                  ? styles.enabledLevel
                                  : styles.disabledLabel
                              }
                            >
                              <span>{lang.lessons}:</span>
                            </label>
                            <select
                              name="lessonId"
                              id={`${s._id}-lessonId`}
                              className={styles.select}
                              disabled={hasSkater(s._id) ? false : true}
                              defaultValue=""
                              onChange={(e) => selection(e, s._id)}
                            >
                              <option value="" hidden></option>
                              {hasSkater(s._id) &&
                                lessonData.map((lesson) => (
                                  <option value={lesson._id} key={lesson._id}>
                                    {translate(lesson.title)}
                                  </option>
                                ))}
                            </select>
                          </div>

                          <div className={styles.label}>
                            <label
                              htmlFor={`${s._id}`}
                              className={
                                hasSkater(s._id)
                                  ? styles.enabledLevel
                                  : styles.disabledLabel
                              }
                            >
                              <span>{lang.type}:</span>
                            </label>
                            <select
                              name="subscriptionType"
                              id={`${s._id}`}
                              className={styles.select}
                              disabled={hasSkater(s._id) ? false : true}
                              defaultValue=""
                              onChange={(e) => selection(e, s._id)}
                            >
                              <option value="" hidden></option>
                              {hasSkater(s._id) &&
                                optionData?.subscriptionData.map(
                                  (subscription) => (
                                    <option
                                      key={subscription._id}
                                      value={subscription._id}
                                    >
                                      {translate(subscription.typePayment)}
                                    </option>
                                  )
                                )}
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                    {/* Additional field */}
                    <div className={styles.element}>
                      <label
                        htmlFor={"textArea"}
                        className={`${styles.enabledLevel} ${styles.textareaLabel} `}
                        //  ${
                        //   fieldValues.textArea ? styles.filled : null
                        // }
                      >
                        {lang.requirements}
                      </label>
                      <textarea
                        className={styles.textarea}
                        type="text"
                        id="textArea"
                        name={"textArea"}
                        rows={3}
                        onBlur={(e) => setAdditional(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className={styles.btnContainer}>
                    <div style={{ marginLeft: "auto" }}>
                      <Button
                        type={"primary"}
                        onClick={bookHandler}
                        disabled={!selectedDate && sign.length === 0}
                      >
                        {lang.book}
                      </Button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RegisteredUser;

// import styles from "./RegisteredUser.module.css";

// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// import DatePickerCalendar from "../../ui/elements/datePicker/Calendar.jsx";
// import { useLanguage } from "../../context/Language.jsx";
// import { useGetSkatersQuery } from "../skaters/useGetSkatersQuery.js";
// // import { useGetUserDataQuery } from "../users/useGetUserDataQuery.js";
// import { useGetSkaterOptionsQuery } from "../skaters/useGetSkaterOptionsQuery.js";
// // import { useGetAllLessonQueries } from "../../pages/lessons/useGetAllLessonQueries.js";
// import { useGetAllValidLessonQueries } from "./useGetAllValidLessonsQuery.js";
// import { useAddRegisteredBookQuery } from "./useAddRegisteredBookQuery.js";
// import { useTranslate } from "../../hooks/useTranslate.js";
// import Button from "../../ui/elements/button/Button.jsx";
// import toast from "react-hot-toast";
// import Spinner from "../../ui/elements/spinner/Spinner.jsx";

// function RegisteredUser() {
//   const { lang, index: selectedLangIndex } = useLanguage();

//   const { translatePhrase: translate } = useTranslate();
//   const [selectedDate, setSelectedDate] = useState();
//   const [sign, setSign] = useState([]);
//   const [additional, setAdditional] = useState("");
//   const navigate = useNavigate();

//   // const { isFetching: userLoading, data: user } = useGetUserDataQuery();

//   const { isFetching: isSkatersLoading, data: skaters } = useGetSkatersQuery();
//   const { isFetching: isOptionsLoading, data: optionData } =
//     useGetSkaterOptionsQuery();
//   const { isFetching: isLessonsLoading, data: incoming } =
//     useGetAllValidLessonQueries();
//   const { mutateAsync, isPending: isAddBookingLoading } =
//     useAddRegisteredBookQuery();

//   const lessonData = incoming.filter((el) => new Date(el.validTo) > new Date());

//   // SELECTING DATE
//   function selectedDateHandler(date) {
//     setSelectedDate((d) => (d = date));
//   }

//   // SELECTING SKATER
//   function checkboxHandler(e, id) {
//     if (e.target.checked) {
//       setSign((arr) => [...arr, { skaterId: id }]);
//     } else {
//       setSign((arr) => arr.filter((el) => el.skaterId !== id));
//     }
//   }

//   // SELECTING LESSONS TYPE & LESSON
//   function selection(e, skaterId) {
//     const skaterObj = sign.filter((s) => s.skaterId === skaterId).at(0);
//     skaterObj[e.target.name] = e.target.value;
//     setSign((state) => (state = [...sign]));
//   }
//   // FINISHING REQUEST
//   async function bookHandler() {
//     // hardcoded disable validation
//     if (!selectedDate && sign.length === 0) {
//       return toast.error("You should fill the form!");
//     }

//     // if not selected date
//     if (!selectedDate) {
//       return toast.error("You should choose a date!");
//     }
//     if (sign.length === 0) {
//       console.log(sign.length);
//       return toast.error("You should make a selection!");
//     }

//     // if selected date is before the current
//     if (new Date(selectedDate) < new Date()) {
//       return toast.error("The selected date is before the current!");
//     }

//     // preview on date
//     // const lessonDate = selectedDate.toDateString();
//     // const result = sign
//     //     .map((s) => {
//     //         if (!!s.skaterId && !!s.subscriptionType && !!s.lessonId) return true;
//     //         else return false;
//     //     })
//     //     .every((x) => x);

//     // const result = sign.filter((s) => !!s.skaterId && !!s.subscriptionType && !!s.lessonId);

//     const dataToServer = sign.reduce((acc, valueObj) => {
//       return !!valueObj.skaterId &&
//         !!valueObj.subscriptionType &&
//         !!valueObj.lessonId
//         ? [
//             ...acc,
//             {
//               ...valueObj,
//               date: selectedDate,
//               additionalRequirements: additional,
//             },
//           ]
//         : acc;
//     }, []);

//     if (dataToServer.length > 0) {
//       try {
//         await mutateAsync(dataToServer);

//         navigate("/profile");
//       } catch (error) {
//         console.log(error.message);
//       } finally {
//         setSign([]);
//       }
//     } else return toast.error("You should select all option for skater");
//   }

//   // HELPER
//   function hasSkater(id) {
//     return sign.find((s) => s.skaterId === id);
//   }
//   return (
//     <>
//       {" "}
//       {isSkatersLoading ||
//       isOptionsLoading ||
//       isLessonsLoading ||
//       isAddBookingLoading ? (
//         <Spinner />
//       ) : (
//         <div className={styles.container}>
//           <h3 className={styles.heading}>{lang.bookLesson}</h3>

//           <div className={styles.secondaryContainer}>
//             <div className={styles.leftPanel}>
//               <p className={styles.headInfo}>
//                 {lang.book_headInfo_1}
//                 <Link className={styles.link} to={"/lessons"}>
//                   {lang.lessons.toLowerCase()}
//                 </Link>{" "}
//                 {lang.book_headInfo_2}
//                 <Link
//                   className={styles.link}
//                   to="http://roleri.bg/rollwp/plans/"
//                 >
//                   {lang.schedule.toLowerCase()}
//                 </Link>
//               </p>
//               <h2 className={styles.secondaryHeading}>
//                 {lang.book_sec_heading_1}
//               </h2>
//               <h3 className={styles.thirdHeading}>Стъпка 1</h3>
//               <p className={styles.paragraph}>
//                 <span>&#9737;</span>
//                 Изберете ден, маркиран в зелено, името на участника, вида на
//                 урока и групата, в която ще се включи.
//               </p>
//               <p className={styles.paragraph}>
//                 <span>&#9737;</span>
//                 Ако изберете Абонамент, това означава,че ще ползвате пакет от
//                 четири урока, взети в рамките на четири поредни седмици в
//                 съответния ден (Ще се отрази при преглед на профила Ви)..
//               </p>

//               <h3 className={styles.thirdHeading}>Стъпка 2</h3>
//               <p className={styles.paragraph}>
//                 <span>&#9737;</span>
//                 Изпратете Вашата форма. Ще получите потвърждение на Вашето
//                 участие на посоченият e-mail адрес.
//               </p>
//               <p className={styles.paragraph}>
//                 <span>&#9737;</span>
//                 При лошо време урока се прехвърля за следващата дата.{" "}
//               </p>
//               <p className={styles.paragraph}>
//                 <span>&#9737;</span>
//                 Ако по някаква причина не можете да използвате оборудването,
//                 което сте заявили при регистрацията си, напишете го в полето
//                 &apos;Допълнително&apos;
//               </p>
//             </div>

//             <div className={styles.rightPanel}>
//               <h3 className={styles.secondaryHeading}>
//                 {lang.book_sec_heading_2}
//               </h3>
//               <DatePickerCalendar selectedDateProp={selectedDateHandler} />
//               {skaters.length === 0 ? (
//                 <div className={styles.noSkatersContainer}>
//                   <h3 className={styles.secondaryHeading}>
//                     <p>{lang.regBookInfo_1}</p>
//                     <Link
//                       to={"/profile/skaters"}
//                       className={styles.noSkatersLink}
//                     >
//                       {lang.add_skater}
//                     </Link>
//                   </h3>
//                 </div>
//               ) : (
//                 <>
//                   <h3 className={styles.secondaryHeading}>
//                     {lang.select_skaters}
//                   </h3>
//                   <div className={` ${styles.userChoice} `}>
//                     {skaters.map((s) => (
//                       <div className={styles.skaterWrapper} key={s._id}>
//                         <div className={styles.skaterContainer}>
//                           <p
//                             className={styles.skaterName}
//                           >{`${s.firstName} ${s.lastName}`}</p>
//                           <input
//                             className={styles.skaterSelection}
//                             type="checkbox"
//                             onChange={(e) => checkboxHandler(e, s._id)}
//                           />
//                         </div>

//                         <div className={styles.selectContainer}>
//                           <div className={styles.label}>
//                             <label
//                               htmlFor={`${s._id}-lessonId`}
//                               className={
//                                 hasSkater(s._id)
//                                   ? styles.enabledLevel
//                                   : styles.disabledLabel
//                               }
//                             >
//                               <span>{lang.lessons}:</span>
//                             </label>
//                             <select
//                               name="lessonId"
//                               id={`${s._id}-lessonId`}
//                               className={styles.select}
//                               disabled={hasSkater(s._id) ? false : true}
//                               defaultValue=""
//                               onChange={(e) => selection(e, s._id)}
//                             >
//                               <option value="" hidden></option>
//                               {hasSkater(s._id) &&
//                                 lessonData.map((lesson) => (
//                                   <option value={lesson._id} key={lesson._id}>
//                                     {translate(lesson.title)}
//                                   </option>
//                                 ))}
//                             </select>
//                           </div>

//                           <div className={styles.label}>
//                             <label
//                               htmlFor={`${s._id}`}
//                               className={
//                                 hasSkater(s._id)
//                                   ? styles.enabledLevel
//                                   : styles.disabledLabel
//                               }
//                             >
//                               <span>{lang.type}:</span>
//                             </label>
//                             <select
//                               name="subscriptionType"
//                               id={`${s._id}`}
//                               className={styles.select}
//                               disabled={hasSkater(s._id) ? false : true}
//                               defaultValue=""
//                               onChange={(e) => selection(e, s._id)}
//                             >
//                               <option value="" hidden></option>
//                               {hasSkater(s._id) &&
//                                 optionData?.subscriptionData.map(
//                                   (subscription) => (
//                                     <option
//                                       key={subscription._id}
//                                       value={subscription._id}
//                                     >
//                                       {translate(subscription.typePayment)}
//                                     </option>
//                                   )
//                                 )}
//                             </select>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                     {/* Additional field */}
//                     <div className={styles.element}>
//                       <label
//                         htmlFor={"textArea"}
//                         className={`${styles.enabledLevel} ${styles.textareaLabel} `}
//                         //  ${
//                         //   fieldValues.textArea ? styles.filled : null
//                         // }
//                       >
//                         {lang.requirements}
//                       </label>
//                       <textarea
//                         className={styles.textarea}
//                         type="text"
//                         id="textArea"
//                         name={"textArea"}
//                         rows={3}
//                         onBlur={(e) => setAdditional(e.target.value)}
//                       />
//                     </div>
//                   </div>
//                   <div className={styles.btnContainer}>
//                     <div style={{ marginLeft: "auto" }}>
//                       <Button
//                         type={"primary"}
//                         onClick={bookHandler}
//                         disabled={!selectedDate && sign.length === 0}
//                       >
//                         {lang.book}
//                       </Button>
//                     </div>
//                   </div>
//                 </>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default RegisteredUser;
