import styles from "./History.module.css";

import { useLanguage } from "../../context/Language.jsx";
import toast from "react-hot-toast";

function History() {
  const { lang } = useLanguage();

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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "18px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "20px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "22px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "24px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "26px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "28px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "30px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "32px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "34px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "36px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "38px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
          <p style={{ fontSize: "40px" }}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iusto,
            illum.
          </p>
        </div>
      </div>
    </>
  );
}

export default History;
