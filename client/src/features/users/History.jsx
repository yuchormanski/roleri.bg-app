import styles from "./History.module.css";

import { useLanguage } from "../../context/Language.jsx";
import toast from "react-hot-toast";
import { useGetHistory } from "./useGetHistory.js";
import { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.js";
import { useTranslate } from "../../hooks/useTranslate.js";

function History() {
  const [totalPages, setTotalPages] = useState(0);
  const [isInitialRendering, setIsInitialRendering] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const bottomElementRef = useRef(null);
  const { page } = useInfiniteScroll(bottomElementRef, initialHandler);
  const { lang } = useLanguage();
  const { translatePhrase: translate } = useTranslate();

  const { mutate, isPending, data } = useGetHistory();

  console.log(historyData);

  useEffect(() => {
    if (isInitialRendering) {
      loadHistory();
    } else if (totalPages === 0 || totalPages >= page) {
      loadHistory();
    }
  }, [page, totalPages, isInitialRendering]);

  useEffect(() => {
    if (data) {
      setHistoryData((prevData) => [...prevData, ...data.data]); // Append new data to existing historyData
      setTotalPages(data.totalPages);
    }
  }, [data]);

  function loadHistory() {
    mutate({ limit: 5, page });
  }

  function initialHandler() {
    setIsInitialRendering(false);
  }

  function toastClick() {
    toast(
      (t) => (
        <div className={styles.tostBg}>
          <div className="flex-1 w-0 p-4">Lorem ipsum dolor sit amet.</div>
          <div className="">
            <button type={"primary"} onClick={() => toast.dismiss(t.id)}>
              Close
            </button>
          </div>
        </div>
      ),
      {
        duration: 5000,
      }
    );
  }
  return (
    <>
      <div className={styles.container}>
        <h3 className={styles.heading}>{lang.historyHeading}</h3>

        <div className={styles.secondaryContainer}>
          <button
            style={{
              width: "fit-content",
              fontSize: "20px",
              backgroundColor: "gray",
              padding: "1rem",
            }}
            onClick={toastClick}
          >
            Toast test
          </button>

          {/* Render history data */}
          <p style={{ fontSize: "32px" }}>TODO: this should be styled</p>
          {historyData.length !== 0 ? (
            historyData.map((h, index) => (
              <p key={index} style={{ fontSize: "20px" }}>
                {translate(h.lessonId.title)} - {h.skaterId.firstName}{" "}
                {h.skaterId.lastName}
              </p>
            ))
          ) : (
            <p style={{ fontSize: "40px" }}>There are no lessons booked</p>
          )}
        </div>

        <div ref={bottomElementRef} />

        <div className={styles.outerBox}>
          <div className={styles.innerBox}></div>
          <div className={styles.content}>
            <p>Edit</p>
            <span className={styles.border}></span>
            <p>Delete</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default History;
