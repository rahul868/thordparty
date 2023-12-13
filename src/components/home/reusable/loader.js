import React from "react";
import styles from "../../../styles/reusable/loader.module.css";

export default function Loader({ c_styles }) {
  return (
    <>
      <div className={styles.loader}>
        <div className={styles.ub_loader}>
          <div style={c_styles} className={styles.circle_loader}></div>
          <div style={c_styles} className={styles.circle_loader}></div>
          <div style={c_styles} className={styles.circle_loader}></div>
          <div style={c_styles} className={styles.circle_loader}></div>
        </div>
      </div>  
    </>
  );
}
