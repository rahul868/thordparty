import styles from "@/styles/home/rhs/rhswrapper.module.css";
import Rheader from "./header";
import Rchat from "./chat";
import Rdocviewer from "./docviewer";
import Controller from "./controller";

export default function Rhswrapper() {
  return (
    <div className={styles.rhs_content_wrapper}>
      <Rheader />
      <Controller />
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
