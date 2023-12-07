import { Gcommoncontext } from "@/context/common_global";
import styles from "@/styles/home/rhs/docviewer.module.css";
import { useEffect, useRef, useContext } from "react";
export default function Rdocviewer({ path }) {
  const { currdoc } = useContext(Gcommoncontext);
  if (currdoc) {
    return (
      <>
        <div id="doc_container" style={{ height: "100%" }}>
          <iframe
            src={currdoc.slug}
            width="100%"
            height="100%"
            frameborder="0"
          />
        </div>
      </>
    );
  }
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}
    >
      Sorry for inconvienience. Data not found.
    </div>
  );
}
