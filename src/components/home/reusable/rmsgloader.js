import React from "react";
import styles from "@/styles/home/rhs/model.module.css";

export default function Rmsgloader({ children }) {
  return (
    <div className={styles.msg_for_ai}>
      <div className={styles.msg_sub_for_ai}>
        <div
          className={styles.box_wrapper_msg}
          style={{ alignItems: "center" }}
        >
          <img src="assets/images/favicon.png" alt="documential_model" />
          {children}
        </div>
      </div>
    </div>
  );
}
