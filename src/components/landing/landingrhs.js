import React from "react";
import styles from "../../styles/landing/landrhs.module.css";
import Rnewchat from "../newchat/newchatwidget";

function Landingrhs() {
  return (
    <div className={styles.landing_for_rhs_main}>
      <div className={styles.landing_rhs_sub_wrapper}>
        <div className={styles.landing_heading_part}>
          <div className={styles.welcome_root}>
            <span className={styles.wel_desgine}>Welcome</span>&nbsp;&nbsp;
            <span style={{ fontSize: "24px" }}>to Documents!</span>
          </div>
          <div className={styles.heading_para}>
            Find and compare information across all your content.
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
