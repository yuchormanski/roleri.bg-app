import styles from "./TeamList.module.css";
import { useLanguage } from "../../../context/Language.jsx";
import Select from "react-select";
import { useEffect, useState } from "react";
import { customStyles } from "./customStyles.js";

const usersList = [
  {
    _id: "65d1e25875c58bac29f86ea7",
    firstName: "Van",
    lastName: "Deribohten",
    email: "van@deribohten.com",
    phone: "+359763826480",
    role: "admin",
    updatedAt: "2024-03-07T19:22:21.505Z",
  },
  {
    _id: "65d1e25875c58bac29f86ea7",
    firstName: "Petar",
    lastName: "Petrov",
    email: "petar@bv.bg",
    phone: "+3597736274629",
    role: "user",
    updatedAt: "2024-03-10T19:22:21.505Z",
  },
];

function TeamList() {
  const { lang } = useLanguage();
  const [selectedOption, setSelectedOption] = useState(null);
  const [criteria, setCriteria] = useState({ value: "all", label: "All" });
  const [options, setOptions] = useState([]);

  const listOptions = [
    { value: "all", label: "All" },
    { value: "user", label: "Users" },
    { value: "instructor", label: "Instructors" },
    { value: "admin", label: "Admins" },
  ];

  // Until have a endpoint to do the request
  useEffect(() => {
    let res = [];
    console.log();
    if (criteria.value === "all") {
      res = usersList.map((el) => {
        return {
          value: el._id,
          label: `${el.firstName} ${el.lastName}`,
          role: el.role,
        };
      });
    } else {
      const filtered = usersList.filter((el) =>
        el.role === criteria.value ? { value: "test", label: "Test" } : null
      );
      res = filtered.map((el) => {
        return {
          value: el._id,
          label: `${el.firstName} ${el.lastName}`,
          role: el.role,
        };
      });
    }
    setOptions((opt) => [...res]);
  }, [criteria]);

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.team}</h3>

        <div className={styles.secondaryContainer}>
          <div className={styles.criteriaContainer}>
            <Select
              defaultValue={criteria}
              onChange={setCriteria}
              options={listOptions}
              styles={customStyles}
              placeholder={
                <div style={{ fontSize: 16 }}>Select list criteria</div>
              }
              // isMulti
            />
          </div>
          <div className={styles.element}>
            <Select
              isSearchable
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              styles={customStyles}
              placeholder={<div style={{ fontSize: 16 }}>Search user</div>}
              // isMulti
            />
          </div>
        </div>

        <section className={styles.description}>
          <p className={styles.info}>
            <span>&#9737;</span>
            {/* {lang.} */}
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. At
            accusamus dolorem reprehenderit, voluptatum cumque ea pariatur? Est
            eaque similique aperiam quae placeat. Sunt, necessitatibus nostrum
            perferendis voluptatum exercitationem deserunt accusamus dignissimos
            libero veritatis cum porro non mollitia vel, eaque nobis! Dolor,
            magnam excepturi? Neque inventore corrupti nesciunt, doloribus
            obcaecati eum.
          </p>
        </section>
      </div>
    </>
  );
}

export default TeamList;
