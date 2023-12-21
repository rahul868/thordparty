import styles from "../../../styles/reusable/flyerpopup.module.css";

export default function Flyer({ children }) {
  return (
    <div data-g-navbar-flyer className={styles.nav_flyers_inner_wrapper}>
      <div className={styles.nav_flyer_inner_sub_wrapper}>{children}</div>
    </div>
  );
}
