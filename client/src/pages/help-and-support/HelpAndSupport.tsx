import React, { FC, useEffect } from "react";
import Footer from "../../components/UI/Footer";
import styles from "./HelpAndSupport.module.scss";
import { Link } from "react-router-dom";

const HelpAndSupport: FC = () => {
  useEffect((): void => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="__container">
        <h1 className={styles.title}>Hi, how can we help you?</h1>
        <div className={styles.blocks}>
          <div className={styles.block}>
            <div className={styles.block_text}>
              <img src="/HelpAndSupport/icon1.svg" alt="Image" />
              <span>I Want To Know Where My Order Is</span>
            </div>
            <p className={styles.text}>
              Get stsatus updates about your order with our Tricking Tool
            </p>
          </div>
          <div className={styles.block}>
            <div className={styles.block_text}>
              <img src="/HelpAndSupport/icon2.svg" alt="Image" />
              <span>I Want To Know Where My Order Is</span>
            </div>
            <p className={styles.text}>
              Get stsatus updates about your order with our Tricking Tool
            </p>
          </div>
          <div className={styles.block}>
            <div className={styles.block_text}>
              <img src="/HelpAndSupport/icon3.svg" alt="Image" />
              <span>I Want To Know Where My Order Is</span>
            </div>
            <p className={styles.text}>
              Get stsatus updates about your order with our Tricking Tool
            </p>
          </div>
        </div>
        <h2 className={styles.title}>I have another Question</h2>
        <div className={styles.question_links}>
          <a href="#" className={styles.question_link}>
            Search
          </a>
          <a href="#" className={styles.question_link}>
            Browse Help Center
          </a>
        </div>
        <div className={styles.contact_us}>
          <h3 className={styles.title}>Contact us</h3>
          <div className={styles.contact_content}>
            <img
              className={styles.logo}
              src="/HelpAndSupport/logo1.png"
              alt="Image"
            />
            <div className={styles.contact_sidebar}>
              <p className={styles.contact_text}>
                For order status inquiry, please click{" "}
                <span style={{ color: "#2283DC", cursor: "pointer" }}>
                  here
                </span>{" "}
                <br></br>
                To cancel and return ordered items, please log-in with your
                account here <br></br> For other concerns, feel free to visit
                our Help Center Page here <br></br> Can't find the answer you
                are looking for? Chat with us or you can also <br></br> call us
                at 021-111-132729 | Mon - Sat (09:00 am till 09:00 pm).
              </p>
              <a href="#">
                <Link to="/chat-answers">
                  <button className={styles.content_button}>
                    LIVE CHAT NOW!
                  </button>
                </Link>
              </a>
              <span>Still need help? Click here</span>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpAndSupport;