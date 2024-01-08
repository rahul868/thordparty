import React from "react";
import styles from "@/styles/Auth/google.module.css";
import Loader from "./loader";

function Googlelogin({ func, loading }) {
  return (
    <div
      className={styles.google_login_container}
      onClick={() => {
        func();
      }}
    >
      {/* {loading ? (
        <Loader c_styles={{ backgroundColor: "#676767" }} />
      ) : (
        <div className={styles.google_login_subcontainer}>
          <img alt="google_auth_login" src={"assets/svg/google.svg"} />
          <span>Continue with Google</span>
        </div>
      )} */}
      <div className={styles.google_login_subcontainer}>
        <img alt="google_auth_login" src={"assets/svg/google.svg"} />
        <span>Continue with Google</span>
        <div style={{ paddingLeft: 20 }}>
          {loading ? (
            <Loader c_styles={{ backgroundColor: "#676767" }} />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}

export default Googlelogin;
