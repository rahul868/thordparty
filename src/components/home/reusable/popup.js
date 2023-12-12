import { Gcommoncontext } from "@/context/common_global";
import styles from "@/styles/reusable/popup.module.css";
import { useContext } from "react";

function Popup({
  children,
  custom_styles,
  custom_styles_width,
  uid,
  title,
  callback,
}) {

  const popup_cutom_fun = () => {
    if (callback) {
      callback();
    }
  };
  return (
    <>
      <div
        id={uid}
        style={custom_styles}
        className="popup_container"
        data-g-navbar-flyer
      >
        <div className="popup_dialog">
          {title ? (
            <div className={styles.popup_header}>
              <span>{title}</span>
              <div
                onClick={() => popup_cutom_fun()}
                className={styles.cancletrigger}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="rgba(55, 53, 47, 0.85)"
                  style={{
                    width: 16,
                    height: 16,
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
          ) : (
            <></>
          )}
          <div style={custom_styles_width} className="popup_content">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default Popup;
