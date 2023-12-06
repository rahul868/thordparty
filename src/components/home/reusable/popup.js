import styles from "@/styles/reusable/popup.module.css";
import { useEffect } from "react";

function Popup({ children, custom_styles, custom_styles_width }) {
 
  return (
    <>
      <div
        style={custom_styles}
        className="popup_container"
        data-g-navbar-flyer
      >
        <div className="popup_dialog">
          <div style={custom_styles_width} className="popup_content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
