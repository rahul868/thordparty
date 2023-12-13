import React from "react";
import styles from "@/styles/home/rhs/model.module.css";
import Namemodel from "./namemodel";

export default function Rmsgloader({ children }) {
  return (
    <div className={styles.msg_for_ai}>
      <div className={styles.msg_sub_for_ai}>
        <div
          className={styles.box_wrapper_msg}
          style={{ alignItems: "center" }}
        >
          <Namemodel
            c_style={{ background: "#008080", borderRadius: "50%" }}
            name={"Doc AI"}
          />
          {children}
        </div>
      </div>
    </div>
  );
}
