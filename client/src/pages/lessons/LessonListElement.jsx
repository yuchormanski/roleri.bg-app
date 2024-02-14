import { useLanguage } from "../../context/Language.jsx";
import styles from "./LessonListElement.module.css";

function LessonListElement() {
  const { lang, index } = useLanguage();

  const lm = {
    imageUrl:
      "https://roleri.bg/wp-content/uploads/2015/10/advanced_group_winter-300x235.jpg",
    title: "Група напреднали &/& Group advanced",
    titleInfo: "С фиксиран ден и час &/& With fixed day or hour",
    age: "4-99",
    skills: " Правилна стойка, Контрол &/& Correct position, Control",
    participants: " 1 до 7 &/& 1 to 7",
    type: " Един или Абонамент &/& One time or Schedule",
    count: " 1 или 4 *(+2) &/& 1 or 4 *(+2)",
    location: "на открито / в зала &/& ",
    price: "40.00 лева",
    geoLocation: "",
  };

  return (
    <div className="wpb_wrapper">
      <div className="wpb_single_image wpb_content_element vc_align_left">
        <figure className="wpb_wrapper vc_figure">
          <a href="https://roleri.bg/course/advanced-group/">
            <img
              width="300"
              height="235"
              src={lm.imageUrl}
              className="vc_single_image-img attachment-medium"
              alt=""
            />
          </a>
        </figure>
      </div>
      <h2 className="vc_custom_heading">
        {lm.title.split("&/&").at(index) || lm.title}
      </h2>
      <p className="vc_custom_heading">
        {lm.titleInfo.split("&/&").at(index) || lm.titleInfo}
      </p>
      <div className="wpb_raw_code wpb_content_element wpb_raw_html">
        <div className="wpb_wrapper">
          <div className="ztl-course-description">
            <div>
              <span>{lang.age}:</span>
              {lm.age.split("&/&").at(index) || lm.age}
            </div>
            <div>
              <span>{lang.skills}:</span>
              {lm.skills.split("&/&").at(index) || lm.skills}
            </div>
            <div>
              <span>{lang.participants}:</span>
              {lm.participants.split("&/&").at(index) || lm.participants}
            </div>
            <div>
              <span>{lang.type}:</span>
              {lm.type.split("&/&").at(index) || lm.type}
            </div>
            <div>
              <span>{lang.count}:</span>
              {lm.count.split("&/&").at(index) || lm.count}
            </div>
            <div>
              <span>{lang.location}: </span>
              {lm.location.split("&/&").at(index) || lm.location}
            </div>
            <div>
              <span>{lang.price}: </span>
              {lm.price.split("&/&").at(index) || lm.price}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LessonListElement;
