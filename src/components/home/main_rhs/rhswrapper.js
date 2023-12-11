import styles from "@/styles/home/rhs/rhswrapper.module.css";
import Rheader from "./header";
import Rchat from "./chat";
import Rdocviewer from "./docviewer";
import Controller from "./controller";
import Alert from "../reusable/alert";
import { Rhscontext } from "@/context/provider";
import { useContext } from "react";

export default function Rhswrapper() {
  const { gastatus, gamsg, gatype } = useContext(Rhscontext);
  return (
    <div className={styles.rhs_content_wrapper}>
      <Rheader />
      <Controller />
      <Alert alertstatus={gastatus} alerttype={gatype} alertmsg={gamsg} />
      <div className={styles.main_rhs_content}>
        <section id={styles.chat_section}>
          {/* CHAT SECTION */}
          <Rchat />
        </section>

        <section id={styles.document_viewer}>
          {/* DOCUMENT SECTION */}
          <div className={styles.doc_viewercontainer}>
            <Rdocviewer />
          </div>
        </section>
      </div>
    </div>
  );
}
