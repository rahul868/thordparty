import styles from "@/styles/home/lhs/middle.module.css";
import File from "../reusable/file";
import { files } from "@/data/file";
import { useContext } from "react";
import { Gcommoncontext } from "@/context/common_global";
import Folder from "../reusable/folder";
import { useRef, useEffect } from "react";

export default function Lmiddle() {
  const { filemeta, error, loading } = useContext(Gcommoncontext);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  if (filemeta?.length > 0) {
    return (
      <div className={styles.rhs_middle_content}>
        <div className={styles.middle_allchats}>
          <span>Your chats</span>
        </div>
        <div className={styles.documents_hie_container}>
          <div className={styles.documents_hie_subcontainer}>
            {filemeta.map((item) => {
              if (item.type == "file") {
                return <File file={item} />;
              } else {
                return <Folder group={item} />;
              }
            })}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.filemeta_nonexist}>
      <span>No docs or folders are created by you.</span>
      <br />
      <span>You can create now just by just clicking above.</span>
    </div>
  );
}
