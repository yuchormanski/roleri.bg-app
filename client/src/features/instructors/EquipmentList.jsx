import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./EquipmentList.module.css";
import { useLanguage } from "../../context/Language.jsx";

// MOCKED DATA
const equipmentData = [
  {
    skates: [
      { skateSize: 27, quantity: 2 },
      { skateSize: 28, quantity: 1 },
      { skateSize: 30, quantity: 4 },
      { skateSize: 32, quantity: 3 },
    ],
  },
  {
    protection: [
      { protectionSize: "XS", quantity: 3 },
      { protectionSize: "S", quantity: 1 },
      { protectionSize: "M", quantity: 2 },
    ],
  },
];
console.log(equipmentData.at(0).skates);

function EquipmentList() {
  const { lang } = useLanguage();
  const { path, newPath } = usePath();
  useEffect(() => newPath("equipment"), [newPath]);

  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.i_equipment}</h3>

        <div className={styles.secondaryContainer}>
          {equipmentData?.length > 0 ? (
            <>
              {/* SKATES */}
              <h4 className={`${styles.heading} ${styles.sectionHeading}`}>
                {lang.skates}
              </h4>
              <div className={styles.equipmentContainer}>
                {equipmentData.at(0)?.skates.map((equipment) => (
                  <figure className={styles.figure} key={equipment._id}>
                    <div className={styles.content}>
                      <div className={styles.skateItem}>
                        <p className={styles.element}>
                          <span className={styles.elSpan}>{lang.number}:</span>
                          {equipment.skateSize}
                        </p>
                        <p className={styles.element}>
                          <span className={styles.elSpan}>
                            {lang.quantity}:
                          </span>
                          {equipment.quantity}
                        </p>
                      </div>

                      <div className={styles.actionContainer}>
                        {/* <button
                      className={styles.actionBtn}
                      onClick={() => onEditSkates(equipment)}
                      >
                      <LiaEditSolid />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onDeleteSkates(equipment)}
                    >
                      <LiaTrashAlt />
                    </button> */}
                      </div>
                    </div>
                  </figure>
                ))}
              </div>
              {/* PROTECTION */}
              <h4 className={`${styles.heading} ${styles.sectionHeading}`}>
                {lang.protection}
              </h4>
              <div className={styles.equipmentContainer}>
                {equipmentData.at(1)?.protection.map((equipment) => (
                  <figure className={styles.figure} key={equipment._id}>
                    <div className={styles.content}>
                      <div className={styles.skateItem}>
                        <p className={styles.element}>
                          <span className={styles.elSpan}>{lang.number}:</span>
                          {equipment.protectionSize}
                        </p>
                        <p className={styles.element}>
                          <span className={styles.elSpan}>
                            {lang.quantity}:
                          </span>
                          {equipment.quantity}
                        </p>
                      </div>

                      <div className={styles.actionContainer}>
                        {/* <button
                      className={styles.actionBtn}
                      onClick={() => onEditSkates(equipment)}
                    >
                      <LiaEditSolid />
                    </button>
                    <button
                      className={styles.actionBtn}
                      onClick={() => onDeleteSkates(equipment)}
                    >
                      <LiaTrashAlt />
                    </button> */}
                      </div>
                    </div>
                  </figure>
                ))}
              </div>
            </>
          ) : (
            <h2 className={styles.headingNoSkaters}>
              {lang.i_noNeededEquipment}
            </h2>
          )}
        </div>
      </div>
    </>
  );
}

export default EquipmentList;
