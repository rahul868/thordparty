import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import styles from "../../../styles/reusable/gpopupheader.module.css";
import gpopup from "../../../styles/gpopup.module.css";
import { Gcommoncontext } from "@/context/common_global";
export default function Gpopupheader({ content, close, c_style, t_style }) {
  const [windowWidth, setWindowWidth] = useState(false);

  const context = useContext(Gcommoncontext);
  const { isActive, setisActive } = context;

  useEffect(() => {
    // Update window width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth > 550);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  console.log(windowWidth);

  function Closeheader() {
    close();
  }

  return (
    <>
      <div className={styles.popup_heading}>
        <span style={t_style} className={styles.content_heading}>
          {content}
        </span>
        <div onClick={Closeheader} className={styles.closepart}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="rgba(55, 53, 47, 0.85)"
            style={{
              width: 18,
              height: 18,
              WebkitFlexShrink: "0",
              MsFlexShrink: "0",
              flexShrink: "0",
            }}
            viewBox="0 0 24 24"
          >
            <path
              fill="#0F0F0F"
              d="M6.995 7.006a1 1 0 000 1.415l3.585 3.585-3.585 3.585a1 1 0 101.414 1.414l3.585-3.585 3.585 3.585a1 1 0 001.415-1.414l-3.586-3.585 3.586-3.585a1 1 0 00-1.415-1.415l-3.585 3.585L8.41 7.006a1 1 0 00-1.414 0z"
            ></path>
          </svg>
        </div>
      </div>
    </>
  );
}
