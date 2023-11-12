import React, { FC } from "react";
import styles from "./Login.module.scss";

interface LoginProps {
  children: React.ReactNode;
}

const Login: FC<LoginProps> = ({ children }) => {
  return (
    <div>
      <div className="__container">
        <div className={styles.body}>
          <div className={styles.content}>{children}</div>
          <div className={styles.decoration}>
            <div className={styles.first_elem}>
              <img src="/Login/decor1.png" alt="Icon" />
            </div>
            <div className={styles.second_elem}>
              <img src="/Login/decor2.png" alt="Icon" />
            </div>
            <div className={styles.third_elem}>
              <img src="/Login/decor3.png" alt="Icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
