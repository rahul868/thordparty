import React from "react";
import styles from "@/styles/Auth/google.module.css";

function Sociallogin({ func, text, svg }) {
  return (
    <div
      className={styles.google_login_container}
      onClick={() => {
        func();
      }}
    >
      <div className={styles.google_login_subcontainer}>
        {svg ? (
          svg
        ) : (
          <img alt="google_auth_login" src={"assets/svg/google.svg"} />
        )}
        <span>{text || "Continue with Google"}</span>
      </div>
    </div>
  );
}

export default Sociallogin;
