import { Link } from "react-router-dom";
import styles from "./NoWishListPage.module.scss";
import Footer from "../../components/UI/Footer";

const NoWishListPage = () => {
  return (
    <>
      <div className={styles.body}>
        <div className="__container">
          <h1>Wishlist</h1>
          <div className={styles.path}>
            <span>Home</span>
            <span>Wishlist</span>
          </div>
          <div className={styles.content}>
            <h2>No Wishlist Items Found</h2>
            <Link className={styles.link} to="/products">
              Continue Shipping
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default NoWishListPage;
