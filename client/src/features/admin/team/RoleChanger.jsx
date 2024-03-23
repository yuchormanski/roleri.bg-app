import { useState } from "react";
import { useLanguage } from "../../../context/Language.jsx";
import Popup from "../../../ui/elements/popupModal/Popup.jsx";
import styles from "./RoleChanger.module.css";
import { GoX } from "react-icons/go";
import Button from "../../../ui/elements/button/Button.jsx";
import { USER_ROLE } from "../../../services/environment.js";
import { useEditOptionsQuery } from "../useEditOptionsQuery.js";

function RoleChanger({ onClose, selectedOption }) {
  const { lang } = useLanguage();
  const [role, setRole] = useState(selectedOption.role);

  const { mutateAsync, isPending } = useEditOptionsQuery("users");

  async function roleHandler() {
    try {
      const { _id, ...rest } = selectedOption;
      await mutateAsync({ _id, role });

      onClose();
    } catch (error) {
      console.error(error.message);
    }
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
                onClick={() => setRole(USER_ROLE.user)}
                className={`${styles.checkbox} ${role === USER_ROLE.user ? styles.selected : ""
                  }`}
              >
                <p className={styles.boxHeading}>{lang.a_user}</p>
              </button>
              <button
                onClick={() => setRole(USER_ROLE.instructor)}
                className={`${styles.checkbox} ${role === USER_ROLE.instructor ? styles.selected : ""
                  }`}
              >
                <p className={styles.boxHeading}>{lang.a_instructor}</p>
              </button>
              <button
                onClick={() => setRole(USER_ROLE.admin)}
                className={`${styles.checkbox} ${role === USER_ROLE.admin ? styles.selected : ""
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
