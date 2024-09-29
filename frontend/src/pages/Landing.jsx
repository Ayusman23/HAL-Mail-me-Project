import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../css/Landing.module.css"; // Import CSS module
import AOS from "aos";
import "aos/dist/aos.css";
import { gsap } from "gsap";
import team from "./team.svg";

const Landing = () => {
  const navigate = useNavigate(); // Get the navigate function from react-router-dom

  useEffect(() => {
    AOS.init();
    gsap.from(`.${styles["main-heading"]}`, {
      duration: 1,
      y: -50,
      opacity: 0,
    });
    gsap.from(`.${styles["info-text"]}`, {
      duration: 1,
      delay: 0.5,
      y: -50,
      opacity: 0,
    });
    gsap.from(`.${styles["btn_wrapper"]}`, {
      duration: 1,
      delay: 1,
      y: -50,
      opacity: 0,
    });
  }, []);

  const handleSendMailClick = () => {
    navigate("/start");
  };

  return (
    <div>
      <header className={`${styles.container} ${styles.header}`}>
        <nav className={styles.nav}>
          <div className={styles.logo}>
            <h2>Mail.Me</h2>
          </div>
          <div className={styles.nav_menu} id="nav_menu">
            <button className={styles.close_btn} id="close_btn">
              <i className="ri-close-fill"></i>
            </button>
            <ul className={styles.nav_menu_list}>
              <li className={styles.nav_menu_item}>
                <a href="#" className={styles.nav_menu_link}>
                  About
                </a>
              </li>
              <li className={styles.nav_menu_item}>
                <a href="#" className={styles.nav_menu_link}>
                  Service
                </a>
              </li>
              <li className={styles.nav_menu_item}>
                <a href="#" className={styles.nav_menu_link}>
                  Help
                </a>
              </li>
            </ul>
          </div>
          <button className={styles.toggle_btn} id="toggle_btn">
            <i className="ri-menu-line"></i>
          </button>
        </nav>
      </header>

      <section className={styles.wrapper}>
        <div className={styles.container}>
          <div className={styles["grid-cols-2"]}>
            <div className={styles["grid-item-1"]}>
              <h1 className={styles["main-heading"]}>
                Tired of writing same old mails? <span> Try Mail.Me</span>
              </h1>
              <p className={styles["info-text"]}>
                Craft Perfect Emails Effortlessly with AI-Powered Precision
              </p>
              <div className={styles["btn_wrapper"]}>
                <button
                  className={`${styles.btn} ${styles["view_more_btn"]}`}
                  onClick={handleSendMailClick}
                >
                  Send your mail <i className="ri-arrow-right-line"></i>
                </button>
                <button
                  className={`${styles.btn} ${styles["documentation_btn"]}`}
                >
                  documentation
                </button>
              </div>
            </div>
            <div className={styles["grid-item-2"]}>
              <div className={styles["team_img_wrapper"]}>
                <img src={team} alt="team-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.wrapper}>
        <div
          className={styles.container}
          data-aos="fade-up"
          data-aos-duration="1000"
        >
          <div className={styles["grid-cols-3"]}>
            <div className={styles["grid-col-item"]}>
              <div className={styles["icon"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className={styles["featured_info"]}>
                <span className={styles["title"]}>Built for professionals</span>
                <p>
                  Streamlines email drafting, ensuring professional, polished
                  communication, saves time, enhances productivity and leaves
                  lasting impressions with clear, concise, and impactful
                  messages tailored to your style.
                </p>
              </div>
            </div>
            <div className={styles["grid-col-item"]}>
              <div className={styles["icon"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className={styles["featured_info"]}>
                <span className={styles["title"]}>Designed to be modern</span>
                <p>
                  Leverages cutting-edge technology to deliver advanced, modern
                  solutions for email drafting. Experience seamless,
                  intelligent, and adaptive writing assistance that keeps your
                  communications ahead of the curve.
                </p>
              </div>
            </div>
            <div className={styles["grid-col-item"]}>
              <div className={styles["icon"]}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M10 20l4-16m4 4l-4 4 4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <div className={styles["featured_info"]}>
                <span className={styles["title"]}>
                  Documentation for everything
                </span>
                <p>
                  Offers comprehensive, user-friendly documentation, guiding you
                  through every feature. Easily access tutorials, FAQs, and
                  support to maximize the platform's capabilities and enhance
                  your experience.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer></footer>
    </div>
  );
};

export default Landing;
