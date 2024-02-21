import styles from "./Home.module.css";

import { FaRegFolderOpen } from "react-icons/fa";
import toast from "react-hot-toast";

import { useLanguage } from "../../context/Language.jsx";

import { useGetAllNewsQueries } from "./useGetAllNewsQueries.js";
import Spinner from "../../ui/elements/spinner/Spinner.jsx";

function Home() {
  const { lang } = useLanguage();

  const { isLoading, isError, error, data: news } = useGetAllNewsQueries();

  if (isError) {
    toast.error(error.message);
  }

  return (
    <>
      <h1 className={styles.heading}>{lang.home}</h1>
      {isLoading ? (
        <Spinner />
      ) : (
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
                <a
                  href={n.newsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.linkPrimary}
                >
                  {lang.details}
                </a>
              </div>
            </article>
          ))}
        </section>
      )}
    </>
  );
}

export default Home;
