import React, { useContext } from "react";
import styles from "../../styles/landing/landrhs.module.css";
import Lfileindicator from "./lfileindicator";
import Lintro from "./lintro";
import Luploaderwidget from "./luploaderwidget";
import { Gcommoncontext } from "@/context/common_global";
import Gpopup from "../home/reusable/gpopup";
function Landingrhs() {
  const { pastatus, pamsg, pasecmsg, patype, isfirstupload } =
    useContext(Gcommoncontext);

  if (pastatus) {
    // Uploading in progress animation or UI
    return (
      <div>
        <Gpopup isOpen={pastatus} onClose={() => null}></Gpopup>
      </div>
    );
  }

  return (
    <div className={styles.landingwrapper}>
      <div className={styles.landingsubwrapper}>
        <Lintro />
        <Luploaderwidget />
        <Lfileindicator />
      </div>
    </div>
  );
}

export default Landingrhs;
