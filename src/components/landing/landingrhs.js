import React, { useContext } from "react";
import styles from "../../styles/landing/landrhs.module.css";
import Rnewchat from "../newchat/newchatwidget";
import { Gcommoncontext } from "@/context/common_global";

function Landingrhs() {
  const {user} = useContext(Gcommoncontext);
  return (
    <div className={styles.landing_for_rhs_main}>
      <div className={styles.landing_rhs_sub_wrapper}>
        <div className={styles.landing_heading_part}>
          <div className={styles.welcome_root}>
            <span className={styles.wel_desgine}>Welcome {user.name} in Documentia</span>
          </div>
          <div className={styles.heading_para}>
            Find and compare information across all your content.
            Find and compare information across all your content.
          </div>
        </div>
        <div className={styles.landing_upload_area}>
          <div className={styles.main_upload_area}>{<Rnewchat />}</div>
        </div>
      </div>
      {/* <div>
        <img src="/assets/svg/landingupload.svg" />
      </div> */}
    </div>
  );
}

export default Landingrhs;
