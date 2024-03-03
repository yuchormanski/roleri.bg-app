import styles from "./PageNotFound.module.css";
import { useMoveBack } from "../hooks/useMoveBack";

function PageNotFound() {
  const { moveBack } = useMoveBack();

  return (
    // <>
    //   <h3>The page you are looking for could not be found 😢</h3>
    //   <button onClick={moveBack} size="large">
    //     &larr; Go back
    //   </button>
    // </>

    <>
      <div className={styles.page}>
        <h2 className={styles.heading}>Something went wrong!</h2>
        <p className={styles.friendlyMessage}>Please, try again later</p>
        {/* <pre className={styles.errorMessage}>{error.message}</pre> */}
        <a href="/" className={styles.link}>
          Return to Home
        </a>
      </div>
    </>
  );
}

export default PageNotFound;
