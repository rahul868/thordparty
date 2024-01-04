import React from "react";
import styles from "@/styles/reusable/loader.module.css";

export default function Loader({ c_styles }) {
  return (
    <>
      <div className={styles.spinner}>
        <div style={c_styles} className={styles.bounce1}></div>
        <div style={c_styles} className={styles.bounce2}></div>
        <div style={c_styles} className={styles.bounce3}></div>
      </div>
    </>
  );
}
