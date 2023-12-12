import React from "react";
import styles from "../../../styles/reusable/loader.module.css";

export default function Loader() {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.ub_loader}>
          <div
            style={{ backgroundColor: "#444" }}
            className={styles.circle_loader}
          ></div>
          <div
            style={{ backgroundColor: "#444" }}
            className={styles.circle_loader}
          ></div>
          <div
            style={{ backgroundColor: "#444" }}
            className={styles.circle_loader}
          ></div>
          <div
            style={{ backgroundColor: "#444" }}
            className={styles.circle_loader}
          ></div>
        </div>
      </div>
    </>
  );
}
