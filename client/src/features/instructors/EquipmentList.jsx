import { useEffect, useState } from "react";
import { usePath } from "../../context/PathContext.jsx";
import styles from "./EquipmentList.module.css";
import { useLanguage } from "../../context/Language.jsx";
import { useQueryClient } from "@tanstack/react-query";
import { useMoveBack } from "../../hooks/useMoveBack.js";

function EquipmentList() {
  const [equipmentData, setEquipmentData] = useState([]);
  const { lang } = useLanguage();
  const { path, newPath } = usePath();
  const { redirectTo } = useMoveBack();
  const queryClient = useQueryClient();

  useEffect(() => {
    // Initialize objects to store skates and protection
    const data = queryClient.getQueryData(["lessonsActive"]);
    if (!data) {
      redirectTo("/on-duty");
      return;
    }
    const extractedData = Object.values(data).flatMap((v) => v.data);
    const skatesData = [];
    const protectionData = [];

    extractedData.forEach((booking) => {
      const {
        skater: { skatesSize, protection },
      } = booking;

      // Add skate size to skatesData array if quantity is greater than 0
      if (skatesSize && skatesSize.size !== 0) {
        const skateIndex = skatesData.findIndex(
          (item) => item.skateSize === skatesSize
        );
        if (skateIndex === -1) {
          skatesData.push({ skateSize: skatesSize, quantity: 1 });
        } else {
          skatesData[skateIndex].quantity++;
        }
      }

      // Add protection size to protectionData array if quantity is greater than 0
      if (protection && protection.size !== 0) {
        const protectionIndex = protectionData.findIndex(
          (item) => item.protectionSize === protection
        );
        if (protectionIndex === -1) {
          protectionData.push({ protectionSize: protection, quantity: 1 });
        } else {
          protectionData[protectionIndex].quantity++;
        }
      }
    });

    skatesData.sort((a, b) => a.skateSize - b.skateSize);
    // Wrap skates and protection data in their own objects
    const skatesObject = { skates: skatesData };
    const protectionObject = { protection: protectionData };

    // Combine skates and protection objects into a single array
    setEquipmentData([skatesObject, protectionObject]);
  }, []);

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
