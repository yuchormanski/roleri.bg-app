import styles from "./TeamList.module.css";
import { useLanguage } from "../../../context/Language.jsx";
import Select from "react-select";
import { useEffect, useState } from "react";
import { customStyles } from "./customStyles.js";
import { Link } from "react-router-dom";
import Button from "../../../ui/elements/button/Button.jsx";
import { useTheme } from "../../../context/DarkMode.jsx";

import { TfiEmail } from "react-icons/tfi";
import { PiPhoneOutgoingThin } from "react-icons/pi";

import { GoIssueOpened } from "react-icons/go";
import RoleChanger from "./RoleChanger.jsx";
import DeleteUser from "./DeleteUser.jsx";

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
    _id: "65d1e25875c58bac29f86ea8",
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
  const { isDark } = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [criteria, setCriteria] = useState({ value: "all", label: lang.a_all });
  const [options, setOptions] = useState([]);
  const [modalOption, setModalOption] = useState(1);

  const listOptions = [
    { value: "all", label: lang.a_all },
    { value: "user", label: lang.a_user_management },
    { value: "instructor", label: lang.a_instructors },
    { value: "admin", label: lang.a_admins },
  ];

  useEffect(() => {
    let res = [];

    setSelectedOption(null);

    if (criteria.value === "all") {
      res = usersList.map((el) => {
        return {
          ...el,
          value: el._id,
          label: `${el.firstName} ${el.lastName}`,
        };
      });
    } else {
      const filtered = usersList.filter((el) => el.role === criteria.value);
      res = filtered.map((el) => {
        return {
          ...el,
          value: el._id,
          label: `${el.firstName} ${el.lastName}`,
        };
      });
    }
    setOptions((opt) => [...res]);
  }, [criteria]);

  function toggleModal(state) {
    setModalOption(state);
    setOpenModal(true);
  }

  function onClose(e) {
    setOpenModal(false);
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.a_user_management}</h3>

        <div className={styles.secondaryContainer}>
          <div className={styles.criteriaContainer}>
            <p className={styles.bulletText}>{lang.a_users_p1}</p>
            <div className={styles.criteriaBlock}>
              <Select
                // defaultValue={criteria}
                value={criteria}
                onChange={setCriteria}
                options={listOptions}
                styles={customStyles}
              />
            </div>
          </div>
          <div className={styles.element}>
            <Select
              isSearchable
              value={selectedOption}
              onChange={setSelectedOption}
              options={options}
              styles={customStyles}
              placeholder={<div style={{ fontSize: 16 }}>{lang.a_search}</div>}
            />
          </div>

          {selectedOption && (
            <>
              <section className={styles.resultContainer}>
                <p className={styles.resValue}>
                  <TfiEmail />
                  <Link
                    to="#"
                    onClick={(e) => {
                      window.location = `mailto:${selectedOption.email}`;
                      e.preventDefault();
                    }}
                  >
                    {selectedOption.email}
                  </Link>
                </p>
                <p className={styles.resValue}>
                  <PiPhoneOutgoingThin />
                  <Link
                    to="#"
                    onClick={(e) => {
                      window.location = `callto:${selectedOption.phone}`;
                      e.preventDefault();
                    }}
                  >
                    {selectedOption.phone}
                  </Link>
                </p>

                <p className={styles.resValue}>
                  <span>User role:</span>
                  {selectedOption.role}
                </p>
                <p className={styles.resValue}>
                  <span>Registration date: </span>
                  {new Date(selectedOption.updatedAt).toLocaleDateString(
                    "fr-CH"
                  )}
                </p>
              </section>
              <div className={styles.actionContainer}>
                <Button type={"primary"} onClick={() => toggleModal(1)}>
                  Change role
                </Button>
                <Button type={"primary"} onClick={() => toggleModal(0)}>
                  Delete
                </Button>
              </div>
            </>
          )}
        </div>

        <section className={styles.description}>
          <p className={styles.info}>
            <span>
              <GoIssueOpened />
            </span>
            To create an instructor select him from the list and change his role
          </p>
          <p className={styles.info}>
            <span>
              <GoIssueOpened />
            </span>
            If needed her could be added a tex
          </p>
        </section>
        {openModal && modalOption && (
          <RoleChanger onClose={onClose} selectedOption={selectedOption} />
        )}
        {openModal && !modalOption && (
          <DeleteUser onClose={onClose} selectedOption={selectedOption} />
        )}
      </div>
    </>
  );
}

export default TeamList;
