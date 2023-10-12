import { Link } from "react-router-dom";
import Footer from "../../components/UI/Footer";
import styles from "./ProfilePage.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setFalse } from "../../redux/Slices/isauthSlice";
import { setFalse as setFalseVendor } from "../../redux/Slices/isvendorSlice";
import { RootState } from "../../redux/store";

const ProfilePage = () => {
  const isVendor = useSelector((state: RootState) => state.isVendor.value);
  const dispatch = useDispatch();

  return (
    <>
      <div className="__container">
        <div className={styles.body}>
          <div className={styles.sidebar}>
            <div className={styles.button_item}>
              <img src="ProfilePage/icon1.svg" alt="icon" />
              <button>Profile</button>
            </div>
            <div className={styles.button_item}>
              <img src="ProfilePage/icon2.svg" alt="icon" />
              <button>Address</button>
            </div>
            {isVendor ? null : (
              <div className={styles.button_item}>
                <img src="ProfilePage/icon3.svg" alt="icon" />
                <button>My Orders</button>
              </div>
            )}

            <div className={styles.button_item}>
              <img src="ProfilePage/icon4.svg" alt="icon" />
              <button>Payment Method</button>
            </div>
            {isVendor ? null : (
              <div className={styles.button_item}>
                <img src="ProfilePage/icon5.svg" alt="icon" />
                <button>Wishlist</button>
              </div>
            )}
            <div className={styles.button_item}>
              <img src="ProfilePage/icon6.svg" alt="icon" />
              <button>Change Password</button>
            </div>
            <div className={styles.button_item}>
              <img src="ProfilePage/icon7.svg" alt="icon" />
              <button>Help & Support</button>
            </div>
            <Link to="/terms-and-conditions" className={styles.button_item}>
              <img src="ProfilePage/icon8.svg" alt="icon" />
              <button>Terms & conditions</button>
            </Link>
            <Link to="/contact-us" className={styles.button_item}>
              <img src="ProfilePage/icon9.svg" alt="icon" />
              <button>Contact Us</button>
            </Link>
            <Link
              to="/"
              onClick={() => {
                dispatch(setFalse());
                dispatch(setFalseVendor());
              }}
              className={styles.button_item}
            >
              <img src="ProfilePage/icon10.svg" alt="icon" />
              <button>Logout</button>
            </Link>
          </div>
          <div className={styles.content}>
            <h1 className={styles.title}>Welcome Mr. Muhammad Tallah</h1>
            <div className={styles.content_box}>
              <h2 className={styles.box_name}>Personal Details</h2>
              <div className={styles.content_box_items}>
                <div className={styles.box_inputs}>
                  <div className={styles.inputs_column}>
                    <input
                      className={styles.input}
                      placeholder="Eleanor Pena"
                      type="text"
                    />
                    <input
                      placeholder="alma.lawson@example.com"
                      className={styles.input}
                      type="text"
                    />
                  </div>
                  <input
                    placeholder="0123 456 7889"
                    className={styles.input}
                    type="text"
                  />
                  <input
                    placeholder="3304 Randall Drive"
                    className={styles.input}
                    type="text"
                  />
                  <input
                    placeholder="Hi there, this is my bio..."
                    className={styles.input}
                    type="text"
                  />
                </div>
                <div className={styles.button}>
                  <button className={styles.button}>Update Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProfilePage;