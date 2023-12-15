import { useContext } from "react";
import styles from "../../styles/landing/lintro.module.css";
import { Rhscontext } from "@/context/provider";

export default function Lintro() {
  const { files } = useContext(Rhscontext);
  if (files.length <= 0) {
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
              You need to{" "}
              <span style={{ fontWeight: "bolder" }}>
                upload atleast one document
              </span>{" "}
              to explore documentia. You can upload your documents in{" "}
              <span style={{ fontWeight: "600" }}>right widget.</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
