import styles from "@/styles/reusable/splash.module.css";

export default function Splash() {
  return (
    <div style={{background:"red"}} className={styles.splashwrapper}>
      <div className={styles.splassubhwrapper}>
        <img
          src="/assets/images/logo.png"
          alt="documentia logo"
          id="documential_logo"
        />
      </div>
    </div>
  );
}
