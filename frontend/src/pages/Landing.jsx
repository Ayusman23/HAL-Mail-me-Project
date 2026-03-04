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
                <a href="#about" className={styles.nav_menu_link}>
                  About
                </a>
              </li>
              <li className={styles.nav_menu_item}>
                <a href="#services" className={styles.nav_menu_link}>
                  Service
                </a>
              </li>
              <li className={styles.nav_menu_item}>
                <a href="#help" className={styles.nav_menu_link}>
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

      <section id="about" className={styles.wrapper} style={{ backgroundColor: '#1a1a1a', padding: '100px 0' }}>
        <div className={styles.container} data-aos="fade-right">
          <div className={styles["grid-cols-2"]}>
            <div style={{ padding: '20px' }}>
              <h2 style={{ color: '#66f6f1', fontSize: '2.5rem', marginBottom: '20px' }}>About Mail.Me</h2>
              <p style={{ color: '#e0e0e0', lineHeight: '1.8', fontSize: '1.1rem' }}>
                Mail.Me is a cutting-edge email automation platform designed to empower professionals.
                We believe that communication should be effortless and impactful. Our mission is to
                eliminate the "blank page syndrome" by providing intelligent, contextual email solutions
                that help you connect with your audience better and faster.
              </p>
              <p style={{ color: '#e0e0e0', lineHeight: '1.8', fontSize: '1.1rem', marginTop: '15px' }}>
                Whether you're applying for a job, reaching out to a potential partner, or sending
                promotional offers, our platform ensures your message is clear, professional, and effective.
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <div style={{ width: '300px', height: '300px', background: 'radial-gradient(circle, #66f6f1 0%, transparent 70%)', opacity: 0.2, position: 'absolute' }}></div>
              <h3 style={{ color: '#66f6f1', fontSize: '5rem', opacity: 0.5, letterSpacing: '10px' }}>MAIL.ME</h3>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className={styles.wrapper} style={{ padding: '100px 0' }}>
        <div className={styles.container}>
          <h2 style={{ color: '#66f6f1', fontSize: '2.5rem', textAlign: 'center', marginBottom: '60px' }}>Our Services</h2>
          <div className={styles["grid-cols-3"]} data-aos="zoom-in">
            {[
              { title: "Smart Chatbot", desc: "Jarvis, our offline assistant, helps you generate high-quality email templates instantly.", icon: "🤖" },
              { title: "Template Library", desc: "Access 20+ professionally crafted templates across 10 categories for any situation.", icon: "📚" },
              { title: "Real-time Sending", desc: "Send your emails immediately through our secure and activated SMTP integration.", icon: "⚡" },
              { title: "Data Analytics", desc: "Keep track of all your signups, logins, and sent emails with our automated Excel logging.", icon: "📊" },
              { title: "Secure Storage", desc: "Your drafts and emails are saved securely in our database for future access.", icon: "🔒" },
              { title: "Custom Formatting", desc: "Tailor your emails with custom headers, footers, and personalized placeholders.", icon: "✍️" }
            ].map((service, i) => (
              <div key={i} className={styles["grid-col-item"]} style={{ border: '1px solid #333', padding: '30px', borderRadius: '15px', background: '#111', transition: 'transform 0.3s' }}>
                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>{service.icon}</div>
                <h4 style={{ color: '#66f6f1', fontSize: '1.5rem', marginBottom: '15px' }}>{service.title}</h4>
                <p style={{ color: '#ccc', lineHeight: '1.6' }}>{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="help" className={styles.wrapper} style={{ backgroundColor: '#1a1a1a', padding: '100px 0' }}>
        <div className={styles.container} data-aos="fade-up">
          <h2 style={{ color: '#66f6f1', fontSize: '2.5rem', textAlign: 'center', marginBottom: '40px' }}>Need Help?</h2>
          <div style={{ maxWidth: '800px', margin: '0 auto', background: '#111', padding: '40px', borderRadius: '20px', border: '1px solid #333' }}>
            <h4 style={{ color: '#66f6f1', marginBottom: '20px' }}>Frequently Asked Questions</h4>
            <div style={{ marginBottom: '25px', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>How do I send my first email?</p>
              <p style={{ color: '#ccc' }}>Simply login, enter your content, provide a recipient email, and click 'SEND'.</p>
            </div>
            <div style={{ marginBottom: '25px', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>Why is Jarvis not using Gemini?</p>
              <p style={{ color: '#ccc' }}>We switched to a custom Offline Intelligence system to ensure Jarvis works instantly without needing an external API key.</p>
            </div>
            <div style={{ marginBottom: '25px', borderBottom: '1px solid #222', paddingBottom: '15px' }}>
              <p style={{ color: '#fff', fontWeight: 'bold' }}>Where is my data stored?</p>
              <p style={{ color: '#ccc' }}>All your activity (logins, sent emails) is logged locally in the 'backend/data.xlsx' file for your records.</p>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <p style={{ color: '#e0e0e0' }}>Still have questions? Contact support at <strong>support@mail.me</strong></p>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className={styles.container} style={{ padding: '40px 0', borderTop: '1px solid #333', textAlign: 'center' }}>
          <p style={{ color: '#777' }}>&copy; 2026 Mail.Me - All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
