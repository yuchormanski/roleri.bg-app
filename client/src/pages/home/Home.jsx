import styles from "./Home.module.css";

import { FaRegFolderOpen } from "react-icons/fa";
import toast from "react-hot-toast";

import { useLanguage } from "../../context/Language.jsx";

import { useGetAllNewsQueries } from "./useGetAllNewsQueries.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";
import { Link } from "react-router-dom";

function Home() {
  const { lang } = useLanguage();

  const {
    isLoading,
    isFetching,
    isError,
    error,
    data: news,
  } = useGetAllNewsQueries();

  if (isError) {
    toast.error(error.message);
  }

  return (
    <>
      <h1 className={styles.heading}>{lang.home}</h1>
      {isFetching ? (
        <Spinner />
      ) : (
        <div className={styles.container}>
          {/* <h3 className={styles.heading}>{lang.bookLesson}</h3> */}
          <div className={styles.secondaryContainer}>
            <section className={styles.news}>
              {news.map((n) => (
                <article key={n._id} className={styles.article}>
                  <div className={styles.articleHeader}>
                    <div className={styles.imageWrapper}>
                      <img src={n.imageUrl} alt={n.title} />
                    </div>
                    <h2 className={styles.articleTitle}>
                      {n.title}
                      <span>
                        <FaRegFolderOpen /> {n.date}
                      </span>
                    </h2>
                  </div>
                  <div className={styles.articleBody}>
                    <p>{n.content}</p>
                    <Link
                      to={n.newsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.linkPrimary}
                    >
                      {lang.details}
                    </Link>
                  </div>
                </article>
              ))}
            </section>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
