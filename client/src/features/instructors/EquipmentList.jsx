import { useEffect } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./EquipmentList.module.css";
import { useLanguage } from "../../context/Language.jsx";
import { useGetEquipmentQuery } from "./useGetEquipmentQuery.js";

function EquipmentList() {
  const { lang } = useLanguage();
  const { path, newPath } = usePath();

  const { isFetching, data: equipmentData } = useGetEquipmentQuery();

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
                {equipmentData.at(0)?.skates.map((equipment, index) => (
                  <figure
                    className={styles.figure}
                    key={`${index}${equipment.skateSize}`}
                  >
                    <div className={styles.content}>
                      <div className={styles.skateItem}>
                        <p className={styles.element}>
                          <span className={styles.elSpan}>{lang.number}</span>
                          {Number(equipment.skateSize) === 0
                            ? lang.hasOwn
                            : equipment.skateSize}
                        </p>
                        <p className={styles.element}>
                          <span className={styles.elSpan}>{lang.quantity}</span>
                          {equipment.quantity}
                        </p>
                      </div>

                      <div className={styles.actionContainer}></div>
                    </div>
                  </figure>
                ))}
              </div>
              {/* PROTECTION */}
              <h4 className={`${styles.heading} ${styles.sectionHeading}`}>
                {lang.protection}
              </h4>
              <div className={styles.equipmentContainer}>
                {equipmentData.at(1)?.protection.map((equipment, index) =>
                  equipment.protectionSize != 0 ? (
                    <figure
                      className={styles.figure}
                      key={`${index}${equipment.protectionSize}`}
                    >
                      <div className={styles.content}>
                        <div className={styles.skateItem}>
                          <p className={styles.element}>
                            <span className={styles.elSpan}>{lang.number}</span>
                            {equipment.protectionSize}
                          </p>
                          <p className={styles.element}>
                            <span className={styles.elSpan}>
                              {lang.quantity}
                            </span>
                            {equipment.quantity}
                          </p>
                        </div>
                      </div>
                    </figure>
                  ) : null
                )}
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
