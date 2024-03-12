import { useState } from "react";
import { useLanguage } from "../../../context/Language.jsx";
import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import styles from "./RoleChanger.module.css";
import { GoX } from "react-icons/go";
import Button from "../../../ui/elements/button/Button.jsx";
import { useMoveBack } from "../../../hooks/useMoveBack.js";

function RoleChanger({ onClose, selectedOption }) {
  const { lang } = useLanguage();
  const { redirectTo } = useMoveBack();
  const [role, setRole] = useState(selectedOption.role);

  function roleHandler() {
    const mid = { ...selectedOption, role };
    const { value, label, ...res } = mid;

    // console.log(res);
    redirectTo("/settings");
  }

  return (
    <Popup onClose={onClose} backgroundClick={false}>
      <div className={styles.container}>
        <div className={styles.closeBtn}>
          <button onClick={onClose} className={styles.closeIcon}>
            <GoX />
          </button>
        </div>

        <figure className={styles.figure}>
          <header className={styles.header}>
            <h3
              className={styles.figureHeading}
            >{`${selectedOption.firstName} ${selectedOption.lastName}`}</h3>
          </header>

          <div className={styles.content}>
            <p className={styles.elSpan}>{lang.a_available_roles}:</p>
            <div className={styles.element}>
              <button
                onClick={() => setRole("user")}
                className={`${styles.checkbox} ${
                  role === "user" ? styles.selected : ""
                }`}
              >
                <p className={styles.boxHeading}>{lang.a_user}</p>
              </button>
              <button
                onClick={() => setRole("instructor")}
                className={`${styles.checkbox} ${
                  role === "instructor" ? styles.selected : ""
                }`}
              >
                <p className={styles.boxHeading}>{lang.a_instructor}</p>
              </button>
              <button
                onClick={() => setRole("admin")}
                className={`${styles.checkbox} ${
                  role === "admin" ? styles.selected : ""
                }`}
              >
                <p className={styles.boxHeading}>{lang.a_admin}</p>
              </button>
            </div>

            <div style={{ marginLeft: "auto" }}>
              <Button type="primary" onClick={roleHandler}>
                {lang.a_change}
              </Button>
            </div>
          </div>
        </figure>
      </div>
    </Popup>
  );
}

export default RoleChanger;
