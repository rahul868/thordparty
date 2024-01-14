import styles from "@/styles/home/rhs/rhswrapper.module.css";
import Rheader from "./header";
import Rchat from "./chat";
import Rdocviewer from "./docviewer";
import { useContext } from "react";
import { Gcommoncontext } from "@/context/common_global";
import Controller from "./controller";
import Gpopup from "../reusable/gpopup";
import Landingrhs from "@/components/landing/landingrhs";

export default function Rhswrapper() {
  const { filemeta, docsloadingindicator } = useContext(Gcommoncontext);

  if (docsloadingindicator) {
    return <>Rhs is loading...</>;
  }
  if (filemeta.length <= 0) {
    return (
      <>
        <div
          className="set_img_newchat"
          style={{
            position: "fixed",
            width: "100%",
            left: "0",
          }}
        >
          <img
            loading="lazy"
            style={{ width: "100%" }}
            src="https://qsf.fs.quoracdn.net/-4-ans_frontend_assets.images.home_page_bg_desktop.png-26-4770753d59b970e1.png"
          />
        </div>
        <Gpopup
          id="doc-landingwidget"
          c_ostyle={{ backdropFilter: "blur(8px)" }}
          isOpen={filemeta.length <= 0 ? true : false}
          onClose={() => null}
        >
          <Landingrhs />
        </Gpopup>
      </>
    );
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
