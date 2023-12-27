import Lheader from "./header";
import Lmiddle from "./middle";
import styles from "@/styles/home/lhs/lhswrapper.module.css";

export default function Lhswrapper() {
  return (
    <div id="lhs_section" className={styles.lhs_content_wrapper}>
      <Lheader />
      <Lmiddle />
      
      {/* Documentia logo */}
      <img src="assets/images/logo.png" />
    </div>
  );
}
