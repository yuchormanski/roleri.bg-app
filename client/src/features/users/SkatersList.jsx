import styles from "./SkatersList.module.css";

import { useLanguage } from "../../context/Language.jsx";

import { useQuery } from "@tanstack/react-query";

import { LiaUserEditSolid, LiaTrashAlt } from "react-icons/lia";

// REMOVE THIS
function test() {
  return [
    {
      firstName: "Stamat",
      lastName: "Georgiev",
      gender: "male",
      age: 6,
      _id: 1,
    },
    {
      firstName: "Dimitrinka",
      lastName: "Georgieva",
      gender: "femaile",
      age: 4,
      _id: 23,
    },
  ];
}
// END REMOVE

function SkatersList() {
  const { lang } = useLanguage();
  // TODO: Create HOOK
  const {
    isLoading,
    isError,
    error,
    data: skaters,
  } = useQuery({
    queryKey: ["news"],
    queryFn: test,
    // initialData: [],
  });

  return (
    <div className={styles.container}>
      <h3 className={styles.heading}>{lang.skaters}</h3>

      <div className={styles.skatersContainer}>
        {skaters &&
          skaters.map((skater) => (
            <figure className={styles.figure} key={skater._id}>
              <header className={styles.header}>
                <h3
                  className={styles.figureHeading}
                >{`${skater.firstName} ${skater.lastName}`}</h3>
                <div className={styles.actions}>
                  <button className="actionBtn">
                    <LiaUserEditSolid />
                  </button>
                  <button className="actionBtn">
                    <LiaTrashAlt />
                  </button>
                </div>
              </header>
            </figure>
          ))}
      </div>

      <div className={styles.addSkaterBtnContainer}>
        <button className={styles.addBtn}>{lang.addSkater}</button>
      </div>
    </div>
  );
}

export default SkatersList;
