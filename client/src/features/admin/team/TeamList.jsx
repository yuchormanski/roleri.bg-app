import styles from "./TeamList.module.css";
import { useLanguage } from "../../../context/Language.jsx";
import Select from "react-select";
import { useState } from "react";
import { customStyles } from "./customStyles.js";

const options = [
  { value: "gosho", label: "Gosho", name: "Gosho" },
  { value: "pesho", label: "Pesho", name: "Pesho" },
];
function TeamList() {
  const { lang } = useLanguage();
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.team}</h3>

        <div className={styles.secondaryContainer}>
          {/* <div className={styles.searchBox}>
            <Select />
          </div> */}
          <div className={styles.element}>
            <Select
              name={"age"}
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              styles={customStyles}
              placeholder={<div style={{ fontSize: 16 }}>Search user</div>}
              // isMulti
            />
            {/* <label className={`${styles.selectLabel}`}>
              <span>{lang.age}</span>
            </label> */}
          </div>
        </div>

        <section className={styles.description}>
          <p className={styles.info}>
            <span>&#9737;</span>
            {lang.a_selectedDays}
          </p>

          <p className={styles.info}>
            <span>&#9737;</span>
            {lang.a_selectedDays_election}
          </p>
        </section>
      </div>
    </>
  );
}

export default TeamList;
