import styles from "./History.module.css";

import { useLanguage } from "../../context/Language.jsx";
import toast from "react-hot-toast";
import { useGetHistory } from "./useGetHistory.js";
import { useEffect, useRef, useState } from "react";
import { useInfiniteScroll } from "../../hooks/useInfiniteScroll.js";

function History() {
  const [totalPages, setTotalPages] = useState(0);
  const [isInitialRendering, setIsInitialRendering] = useState(true);
  const [historyData, setHistoryData] = useState([]);
  const bottomElementRef = useRef(null);
  const { page } = useInfiniteScroll(bottomElementRef, initialHandler);
  const { lang } = useLanguage();

  const { mutate, isPending, data } = useGetHistory();

  useEffect(() => {
    if ((totalPages === 0 || totalPages >= page) && !isInitialRendering) {
      loadHistory();
    }

  }, [page, totalPages, isInitialRendering]);

  useEffect(() => {
    if (data) {
      setHistoryData(data.data);
      setTotalPages(data.totalPages);
    }

  }, [data]);

  console.log("TODO ADD DATA", historyData)

  function loadHistory() {
    mutate({ limit: 20, page });
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
          <p style={{ fontSize: "16px" }}>
            16 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "18px" }}>
            18 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "20px" }}>
            20 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "22px" }}>
            22 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "24px" }}>
            24 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "26px" }}>
            26 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "28px" }}>
            28 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "30px" }}>
            30 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "32px" }}>
            32 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "34px" }}>
            34 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "36px" }}>
            36 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "38px" }}>
            38 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
          <p style={{ fontSize: "40px" }}>
            40 Lorem ipsum, dolor sit amet consectetur adipisicing illum.
          </p>
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
