import React, { useContext } from "react";
import styles from "../../styles/landing/landrhs.module.css";
import Rnewchat from "../newchat/newchatwidget";
import { Gcommoncontext } from "@/context/common_global";

function Landingrhs() {
  const { user } = useContext(Gcommoncontext);
  return (
    <div className={styles.landing_for_rhs_main}>
      <div className={styles.landing_rhs_sub_wrapper}>
        <div className={styles.landing_heading_part}>
          <div className={styles.welcome_root}>
            <span className={styles.wel_desgine}>
              Welcome you in Documentia!
            </span>
            <div className={styles.wel_desgine2}>
              Let's start your journey of finding and comparing information
              across all your content.
            </div>
          </div>
          <div className={styles.heading_para}>
            You need to <span style={{fontWeight:"bolder"}}>upload atleast one document</span> to explore documentia. You
            can upload your documents in{" "}
            <span style={{ fontWeight: "600", color: "var(--app-color-code)" }}>
              Right widget.
            </span>
          </div>
        </div>
        <div className={styles.landing_upload_area}>
          <div className={styles.main_upload_area}>{<Rnewchat />}</div>
        </div>
      </div>
    </div>
  );
}

export default Landingrhs;
