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
        <section className={styles.chat_section} id="chat_wrapper">
          {/* CHAT SECTION */}
          <Rchat />
        </section>

        <section className={styles.document_viewer} id="doc_wrapper">
          {/* DOCUMENT SECTION */}
          <div className={styles.doc_viewercontainer}>
            <Rdocviewer />
          </div>
        </section>
      </div>
    </div>
  );
}
