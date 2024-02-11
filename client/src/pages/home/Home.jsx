import styles from "./Home.module.css";

function Home() {
  return (
    <>
      <h1 className={styles.heading}>Home</h1>
      <section className={styles.news}>
        <div>
          <li className="item-post clearfix">
            <a
              className="recentImgRoll"
              href="https://roleri.bg/lessons-in-hall-23-24/"
              title="Уроци в зала"
            >
              <img
                width="50"
                height="50"
                src="https://roleri.bg/wp-content/uploads/2023/10/lessons_hall_23-24-300x300.png"
                className="attachment-kiddie-square-thumb size-kiddie-square-thumb wp-post-image"
                alt=""
                decoding="async"
              />
            </a>
            <div className="recentLabelRoll">
              <h6>
                <a
                  href="https://roleri.bg/lessons-in-hall-23-24/"
                  title="Уроци в зала"
                >
                  Уроци в зала{" "}
                </a>
              </h6>
              <span className="ztl-recent-post-date">
                <i className="flaticon-calendar64"></i>
                <a
                  href="https://roleri.bg/lessons-in-hall-23-24/"
                  title="Уроци в зала"
                >
                  31/10/2023{" "}
                </a>
              </span>
            </div>
            <p className="recentPostRoll">
              &nbsp; Уроците в парка приключиха, но от първата неделя на ноември
              (05.11) продължаваме в зала. А тя се намира на бул. Черни връх 47,
              ет. 2 (бивш завод Витоша) входа е до Lidl. Заниманията отново ще
              са в неделя от 10:00 часа и от 11:00 часа. През формата за
              записване може да заявите участие.
            </p>
            <a
              className="ztl-button recentBtnRoll"
              href="https://roleri.bg/lessons-in-hall-23-24/"
            >
              Още
            </a>
          </li>
        </div>
        <div>
          Far far away, behind the word mountains, far from the countries
          Vokalia and Consonantia, there live the blind texts. Separated they
          live in Bookmarksgrove right at the coast of the Semantics, a large
          language ocean.{" "}
        </div>
      </section>
    </>
  );
}

export default Home;
