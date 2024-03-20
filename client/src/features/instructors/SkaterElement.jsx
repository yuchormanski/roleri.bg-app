import styles from "./SkaterElement.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";

import { ImInfo } from "react-icons/im";
import { TfiEmail } from "react-icons/tfi";
import { PiPhoneLight } from "react-icons/pi";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import Button from "../../ui/elements/button/Button.jsx";

function SkaterElement({ skater }) {
  const {
    _id,
    firstName,
    lastName,
    skates,
    protection,
    requirements,
    instructorInfo,
  } = skater;
  const [modal, setModal] = useState(false);
  const [instructorText, setInstructorText] = useState("");
  const { lang } = useLanguage();

  useEffect(() => {
    if (!instructorInfo) return;
    setInstructorText(instructorInfo);
  }, [instructorInfo]);

  function toggleModal() {
    setModal((modal) => !modal);
  }

  function textHandler(e) {
    setInstructorText(e.target.value);
  }
  return (
    <>
      <figure className={styles.figure}>
        <h3 className={styles.heading}>
          {firstName} {lastName}
        </h3>

        <div className={styles.additional}>
          <p className={styles.skaterProps}>
            <span>{lang.skates}</span>
            {skates}
          </p>
          <p className={styles.skaterProps}>
            <span>{lang.protection}</span>
            {protection}
          </p>
          <button
            className={`${styles.skaterProps} ${styles.infoBlock}`}
            onClick={toggleModal}
          >
            <ImInfo />
          </button>
        </div>
      </figure>

      {modal && (
        <Popup onClose={toggleModal}>
          <div className={styles.modalContainer}>
            <h3 className={styles.headingModal}>
              {firstName} {lastName}
            </h3>

            <div className={styles.parentInfo}>
              <span className={styles.label}>Contact person</span>
              <p className={`${styles.parentELement} ${styles.parentName}`}>
                Ivan Petrov
              </p>
              <p className={styles.parentELement}>
                <span className={styles.spanIcon}>
                  <PiPhoneLight />
                </span>
                <Link to="tel:9876543210">9876543210</Link>
              </p>
              <p className={styles.parentELement}>
                <span className={styles.spanIcon}>
                  <TfiEmail />
                </span>
                <Link to="mailto:jkashdhf@psdfg.com">jkashdhf@psdfg.com</Link>
              </p>
            </div>

            {requirements && (
              <div className={styles.parentInfo}>
                <span className={styles.label}>Requirements</span>
                <p className={styles.additionalContent}>{requirements}</p>
              </div>
            )}
            <div className={styles.parentInfo}>
              <span className={styles.label}>Additional information</span>
              <p className={styles.additionalContent}>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
                consectetur.
              </p>
            </div>

            <div className={styles.parentInfo}>
              <span className={styles.label}>Instructor note</span>
              <textarea
                className={styles.textarea}
                rows={3}
                value={instructorText}
                onChange={textHandler}
              />
            </div>
            <div style={{ marginLeft: "auto" }}>
              <Button type={"primary"}>
                {instructorInfo ? "Update" : "Add"}
              </Button>
            </div>
          </div>
        </Popup>
      )}
    </>
  );
}

export default SkaterElement;
