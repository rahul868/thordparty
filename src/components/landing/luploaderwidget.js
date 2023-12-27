import { Rhscontext } from "@/context/provider";
import styles from "@/styles/landing/luploaderviewer.module.css";
import { useContext } from "react";
export default function Luploaderwidget() {
  const { handleFileChange } = useContext(Rhscontext);

  return (
    <div className={styles.lviewer_wrapper}>
      <div className={styles.lviewer_subwrapper}>
        <label className={styles.drop_zone} id="drop-area" htmlFor={"fileElem"}>
          <input
            type="file"
            id="fileElem"
            multiple
            accept="pdf/*"
            style={{ display: "none" }}
            onChange={handleFileChange}
          />

          <div className={styles.upload_widget_title}></div>
          <div className={styles.icon_upload}>
            <img alt="upload_landing" src="assets/svg/upload.svg" />
          </div>

          <div style={{ textAlign: "center" }}>
            <span style={{ fontWeight: 600 }}>Drag & drop </span> it here
            <br /> or
            <div
              style={{
                color: "var(--app-color-code)",
                fontWeight: "bold",
              }}
            >
              Browse files
            </div>
            <br />
            <span style={{ fontSize: 13, padding: 8, opacity: 0.6 }}>
              You can upload{" "}
              <span style={{ fontWeight: 600 }}>upto 5 files</span> at time.
            </span>
          </div>
        </label>
      </div>
    </div>
  );
}
