import { Gcommoncontext } from "@/context/common_global";
import { useContext, useState } from "react";
export default function Rdocviewer() {
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const { currdoc } = useContext(Gcommoncontext);
  if (error) {
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

  if (loading) {
    return (
      <div className={styles.docviewererror}>
        <span>Loading...</span>
      </div>
    );
  }
  return (
    <>
      <div id="doc_container" style={{ height: "100%" }}>
        <iframe
          allowtransparency="true"
          style={{ backgroundColor: "#666" }}
          src={currdoc.slug}
          width="100%"
          height="100%"
          frameBorder="0"
        />
      </div>
    </>
  );
}
