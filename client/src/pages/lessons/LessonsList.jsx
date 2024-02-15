import styles from "./LessonsList.module.css";
import { useLanguage } from "../../context/Language.jsx";
import LessonListElement from "./LessonListElement.jsx";

function LessonsList() {
  const { lang } = useLanguage();
  const lessonsArr = [
    {
      _id: 1,
      imageUrl:
        "https://roleri.bg/wp-content/uploads/2015/10/beginers_group_winter.jpg",
      title: "Група напреднали &/& Group advanced",
      titleInfo: "С фиксиран ден и час &/& With fixed day or hour",
      age: "4-99",
      skills: " Правилна стойка, Контрол &/& Correct position, Control",
      participants: " 1 до 7 &/& 1 to 7",
      type: " Един или Абонамент &/& One time or Schedule",
      count: " 1 или 4 *(+2) &/& 1 or 4 *(+2)",
      location: "на открито / в зала &/& Outside / Indoor",
      price: "40.00 лева",
      geoLocation: { lat: "", lon: "" },
      description: "",
    },
    {
      _id: 2,
      imageUrl:
        "https://roleri.bg/wp-content/uploads/2015/10/advanced_group_winter-300x235.jpg",
      title: "Група напреднали &/& Group advanced",
      titleInfo: "С фиксиран ден и час &/& With fixed day or hour",
      age: "4-99",
      skills: " Правилна стойка, Контрол &/& Correct position, Control",
      participants: " 1 до 7 &/& 1 to 7",
      type: " Един или Абонамент &/& One time or Schedule",
      count: " 1 или 4 *(+2) &/& 1 or 4 *(+2)",
      location: "на открито / в зала &/& Outside / Indoor",
      price: "40.00 лева",
      geoLocation: { lat: "", lon: "" },
      description: "",
    },
  ];
  return (
    <>
      <h1 className={styles.heading}>{lang.lessons}</h1>
      <div className={styles.lessons}>
        {lessonsArr.map((lm) => (
          <LessonListElement key={lm._id} lm={lm} />
        ))}
      </div>
      <div className={styles.scrollToTop}>
        <button
          onClick={() =>
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: "smooth",
            })
          }
        >
          To top
        </button>
      </div>
    </>
  );
}

export default LessonsList;
