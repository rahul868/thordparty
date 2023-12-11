import { Gcommoncontext } from "@/context/common_global";
import styles from "@/styles/home/rhs/docviewer.module.css";
import { useEffect, useContext, useState } from "react";
export default function Rdocviewer() {
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  useEffect(() => {
    // const iframe = document.querySelector("#docview_iframe");
    // // Show loader while iframe is loading
    // iframe.addEventListener("load", () => {
    //   setloading(false);
    // });
    // // Handle iframe load error
    // iframe.addEventListener("error", (event) => {
    //   console.log("error tra")
    //   seterror(event);
    // });

    var iframe = document.getElementsByTagName("iframe")[0];
    iframe.style.background = "white";
    iframe.contentWindow.document.body.style.backgroundColor = "white";
  });
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
          allowTransparency
          style={{ backgroundColor: "#666" }}
          src={currdoc.slug}
          width="100%"
          height="100%"
          frameborder="0"
        />
      </div>
    </>
  );
}
