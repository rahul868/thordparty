import React from "react";
import styles from "@/styles/Auth/google.module.css";

function Googlelogin({ func }) {
  return (
    <div
      className={styles.google_login_container}
      onClick={() => {
        func();
      }}
    >
      <div className={styles.google_login_subcontainer}>
        <img alt="google_auth_login" src={"assets/svg/google.svg"} />
        <span>Continue with Google</span>
      </div>
    </div>
  );
}

export default Googlelogin;
