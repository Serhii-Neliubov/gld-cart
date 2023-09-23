import { useState } from "react";
import Login from "../../components/UI/Login";
import styles from "./RegisterPage.module.scss";
import { Link } from "react-router-dom";

interface IUser {
  type: string;
  name: string;
  surname: string;
  password: string;
  rePassword: string;
}

interface RegisterPageProps {
  isVendorType: boolean;
}

const RegisterPage = ({ isVendorType }: RegisterPageProps) => {
  const [userData, setUserData] = useState({
    type: "",
    name: "",
    surname: "",
    email: "",
    password: "",
    rePassword: "",
  });
  function sendFormData(formData: IUser) {
    fetch("/your-api-endpoint", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Ответ сервера:", data);
      })
      .catch((error) => {
        console.error("Ошибка при отправке данных:", error);
      });
  }
  function sendFormHandler(): void {
    if (isVendorType) {
      setUserData({ ...userData, type: "Vendor" });
    } else {
      setUserData({ ...userData, type: "Buyer" });
    }

    if (
      userData.password === userData.rePassword &&
      userData.name.length &&
      userData.password.length &&
      userData.surname.length &&
      userData.rePassword.length
    ) {
      sendFormData(userData);
    }
  }

  return (
    <div className={styles.body}>
      <Login>
        <div className={styles.components}>
          <div className={styles.content}>
            <h1 className={styles.title}>Sign up to Gldcart</h1>
            <div className={styles.log_link}>
              <p>Already have an account?</p>
              <Link className={styles.link} to="/login">
                Log in
              </Link>
            </div>
            <button className={styles.google_button}>
              Sign up with google
            </button>
            <p className={styles.email_bar}>or Sign up with Email</p>
            <form>
              <div className={styles.form}>
                <div className={styles.form_column_wrap}>
                  <div className={styles.input}>
                    <span>First Name</span>
                    <input
                      onChange={(e) =>
                        setUserData({ ...userData, name: e.target.value })
                      }
                      value={userData.name}
                      type="text"
                      placeholder="ex:John"
                    />
                  </div>
                  <div className={styles.input}>
                    <span>Last Name</span>
                    <input
                      onChange={(e) =>
                        setUserData({ ...userData, surname: e.target.value })
                      }
                      value={userData.surname}
                      type="text"
                      placeholder="ex:Miller"
                    />
                  </div>
                </div>
                <div className={styles.input}>
                  <span>Your Email</span>
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                    value={userData.email}
                    type="email"
                    placeholder="Gldcart@mail.com"
                  />
                </div>
                <div className={styles.input}>
                  <span>Password</span>
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                    value={userData.password}
                    type="password"
                    placeholder="Min. 6 character"
                  />
                </div>
                <div className={styles.input}>
                  <span>Re-Password</span>
                  <input
                    onChange={(e) =>
                      setUserData({ ...userData, rePassword: e.target.value })
                    }
                    value={userData.rePassword}
                    type="password"
                    placeholder="Min. 6 character"
                  />
                </div>
              </div>
            </form>
          </div>
          <div className={styles.check_box}>
            <input type="checkbox" />
            <span>Remember me</span>
          </div>
          <button onClick={sendFormHandler} className={styles.button}>
            Create my account
          </button>
        </div>
      </Login>
    </div>
  );
};

export default RegisterPage;
