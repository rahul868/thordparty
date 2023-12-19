import styles from "@/styles/home/rhs/rhswrapper.module.css";
import Rheader from "./header";
import Rchat from "./chat";
import Rdocviewer from "./docviewer";
import { useContext } from "react";
import { Gcommoncontext } from "@/context/common_global";
import Controller from "./controller";

export default function Rhswrapper() {
  const { filemeta } = useContext(Gcommoncontext);
  if (filemeta.length <= 0) {
    return <div></div>;
  }
  return (
    <div className={styles.rhs_content_wrapper}>
      <Rheader />
      <Controller />
      <div className={styles.main_rhs_content}>
        <section
          className={`${styles.chat_section} ${styles.chat_sectionspec}`}
          id="chat_wrapper"
        >
          {/* CHAT SECTION */}
          <Rchat />
        </section>

        <section
          className={`${styles.document_viewer} ${styles.document_viewerspec}`}
          id="doc_wrapper"
        >
          {/* DOCUMENT SECTION */}
          <div className={styles.doc_viewercontainer}>
            <Rdocviewer />
          </div>
        </section>
      </div>
    </div>
  );
}
