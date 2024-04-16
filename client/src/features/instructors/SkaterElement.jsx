import styles from "./SkaterElement.module.css";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useLanguage } from "../../context/Language.jsx";

import { useEditInstructorQuery } from "./useEditInstructorQuery.js";
import { useAddInstructorNoteQuery } from "./useAddInstructorNoteQuery.js";

import { ImInfo } from "react-icons/im";
import { MdOutlineDoNotDisturbAlt } from "react-icons/md";
import { PiCheck, PiPhoneLight, PiCurrencyDollar } from "react-icons/pi";
import { GoX } from "react-icons/go";
import { PiSuitcaseRollingLight, PiSuitcaseRolling } from "react-icons/pi";
import { TfiEmail } from "react-icons/tfi";

import Popup from "../../ui/elements/popupModal/Popup.jsx";
import Button from "../../ui/elements/button/Button.jsx";
import { useAuthContext } from "../../context/AuthContext.jsx";

function SkaterElement({ lesson }) {
  const {
    _id,
    isPresent: isPresentServer,
    isPaid: isPaidServer,
    lesson: { title, time },
    skater: {
      firstName,
      lastName,
      skatesSize: skates,
      protection,
      additionalRequirements: skaterRequirement,
    },
    ownerDetails: parentDetails,
    additionalRequirements: lessonRequirements,
    instructorNotes: instructorInfo,
  } = lesson;

  const [modal, setModal] = useState(false);
  const [isPresent, setIsPresent] = useState(isPresentServer);
  const [money, setMoney] = useState(isPresentServer);
  const [isPaid, setIsPaid] = useState(isPaidServer);
  const [isEditable, setIsEditable] = useState(false);
  const [instructorText, setInstructorText] = useState("");
  const { lang } = useLanguage();

  const { getUserHandler } = useAuthContext();
  const currentUserDetails = getUserHandler();

  const { mutateAsync: presentMutation, isPending: presentIsPending } =
    useEditInstructorQuery("present");
  const { mutateAsync: notPresentMutation, isPending: notPresentIsPending } =
    useEditInstructorQuery("notPresent");
  const { mutateAsync: paidMutation, isPending: paidIsPending } =
    useEditInstructorQuery("paid");
  const { mutateAsync: notPaidMutation, isPending: notPaidIsPending } =
    useEditInstructorQuery("notPaid");

  const { mutateAsync: addNoteMutation, isPending: addNoteIsPending } =
    useAddInstructorNoteQuery();
  const { mutateAsync: editNoteMutation, isPending: editNoteIsPending } =
    useEditInstructorQuery("editNote");

  useEffect(() => {
    if (!instructorInfo) return;
    setInstructorText(instructorInfo);
  }, [instructorInfo]);

  useEffect(() => {
    const lessonD = new Date(lesson.date);
    const today = new Date();
    setIsEditable(lessonD === today);
  }, [lesson.date]);

  //   HELEPER
  async function addInstructorNoteHandler() {
    try {
      if (instructorText === "") return;

      const serverData = {
        skater: lesson.skater._id,
        instructor: currentUserDetails._id,
        content: instructorText,
      };

      await addNoteMutation(serverData);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function updateInstructorNoteHandler() {
    try {
      const serverData = {
        skater: lesson.skater._id,
        instructor: currentUserDetails._id,
        content: instructorText,
      };

      await editNoteMutation(serverData);
    } catch (error) {
      console.error(error.message);
    }
  }

  function toggleModal() {
    setModal((modal) => !modal);
  }

  function textHandler(e) {
    setInstructorText(e.target.value);
  }

  async function presentHandler() {
    try {
      if (!isPresent) {
        await presentMutation({ bookingId: _id });
      } else {
        if (window.confirm("Are you sure you want to do this?")) {
          await notPresentMutation({ bookingId: _id });
        } else return;
      }

      setIsPresent((x) => !x);
      setMoney((m) => !m);
    } catch (error) {
      console.error(error.message);
    }
  }

  async function moneyHandler() {
    try {
      if (!isPaid) {
        await paidMutation({ bookingId: _id });
      } else {
        if (window.confirm("Are you sure you want to do this?")) {
          await notPaidMutation({ bookingId: _id });
        } else return;
      }

      setIsPaid((x) => !x);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      <figure className={styles.figure}>
        <div className={styles.buttonContainer}>
          {isEditable && (
            <button
              className={`${styles.isNotPresent} ${
                isPresent ? styles.isHere : null
              }`}
              onClick={presentHandler}
              disabled={isPaid}
            >
              <PiCheck />
            </button>
          )}
          <button
            className={`
          ${styles.isNotPaid} 
          ${money ? styles.viewMoney : null} 
          ${isPaid ? styles.gotMoney : null}
          `}
            onClick={moneyHandler}
          >
            <PiCurrencyDollar />
          </button>
          <h3 className={styles.heading}>
            {firstName} {lastName}
          </h3>
        </div>

        <div className={styles.additional}>
          <p className={styles.skaterProps}>
            {Number(skates) === 0 ? lang.hasOwn : skates}
          </p>
          <p className={styles.skaterProps}>
            {/* {protection == 0 ? lang.hasOwn : protection} */}
            {protection == 0 ? <PiSuitcaseRolling /> : protection}
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
            <div className={styles.closeBtn}>
              <button onClick={toggleModal} className={styles.closeIcon}>
                <GoX />
              </button>
            </div>

            <h3 className={styles.headingModal}>
              {firstName} {lastName}
            </h3>

            <div className={styles.parentInfo}>
              <span className={styles.label}>Contact person</span>
              <p className={`${styles.parentELement} ${styles.parentName}`}>
                {parentDetails.firstName} {parentDetails.lastName}
              </p>
              <p className={styles.parentELement}>
                <span className={styles.spanIcon}>
                  <PiPhoneLight />
                </span>
                <Link to={`tel:${parentDetails.phone}`}>
                  {parentDetails.phone}
                </Link>
              </p>
              <p className={styles.parentELement}>
                <span className={styles.spanIcon}>
                  <TfiEmail />
                </span>
                <Link to={`mailto:${parentDetails.email}`}>
                  {parentDetails.email}
                </Link>
              </p>
            </div>

            {lessonRequirements && (
              <div className={styles.parentInfo}>
                <span className={styles.label}>Lesson Requirements</span>
                <p className={styles.additionalContent}>{lessonRequirements}</p>
              </div>
            )}

            {skaterRequirement && (
              <div className={styles.parentInfo}>
                <span className={styles.label}>Skater Requirements</span>
                <p className={styles.additionalContent}>{skaterRequirement}</p>
              </div>
            )}

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
              <Button
                type={"primary"}
                onClick={
                  instructorInfo
                    ? updateInstructorNoteHandler
                    : addInstructorNoteHandler
                }
              >
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
