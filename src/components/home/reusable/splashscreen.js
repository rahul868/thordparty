import styles from "@/styles/reusable/splash.module.css";

export default function Splash() {
  return (
    <div className={styles.splashwrapper}>
      <div className={styles.splassubhwrapper}>
        <img
          src="assets/images/logo.png"
          alt="documentia logo"
          id="documential_logo"
        />
      </div>
    </div>
  );
}
