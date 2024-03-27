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

import { useGetOptionsQuery } from "../useGetOptionsQuery.js";
import { GoIssueOpened } from "react-icons/go";
import RoleChanger from "./RoleChanger.jsx";
import DeleteUser from "./DeleteUser.jsx";
import Spinner from "../../../ui/elements/spinner/Spinner.jsx";
import { useAddOptionsQuery } from "../useAddOptionsQuery.js";

function TeamList() {
  const { lang } = useLanguage();
  const { isDark } = useTheme();
  const [openModal, setOpenModal] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [criteria, setCriteria] = useState({ value: "all", label: lang.a_all });
  const [options, setOptions] = useState([]);
  const [modalOption, setModalOption] = useState(1);

  const { isFetching, data: usersList } = useGetOptionsQuery("users");
  const { mutate: mutateAddDuty, isPending: isPendingAddDuty } = useAddOptionsQuery('addOnDuty');
  const { mutate: mutateRemoveDuty, isPending: isPendingRemoveDuty } = useAddOptionsQuery('removeOnDuty');

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
  }, [criteria, usersList]);

  function toggleModal(state) {
    setModalOption(state);
    setOpenModal(true);
  }

  function onClose(e) {
    setOpenModal(false);
  }

  function changeOnDutyStatus({_id, individualCoachOnDuty}) {
    
    if (individualCoachOnDuty) {
      mutateRemoveDuty({userId: _id});
    } else {
      mutateAddDuty({userId: _id});

    }
  }

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.a_user_management}</h3>
        {isFetching ? (
          <Spinner />
        ) : (
          <>
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
                    <Button type={"primary"} onClick={() => changeOnDutyStatus(selectedOption)}>
                      {selectedOption.individualCoachOnDuty ? "Not on shift" : "Set on duty"}
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
          </>
        )}
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
