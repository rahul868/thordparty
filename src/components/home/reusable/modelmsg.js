import styles from "@/styles/home/rhs/model.module.css";
import Namemodel from "./namemodel";

// import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
// import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
// import ContentCopyIcon from "@mui/icons-material/ContentCopy";

function Rmodelmsg({ msg }) {
  function copylink(msg) {
    // Copy the text inside the text field
    navigator.clipboard.writeText(msg);

    // Alert the copied text
    alert("Copied the text: " + msg);
  }

  return (
    <>
      <div className={styles.msg_for_ai}>
        <div className={styles.msg_sub_for_ai}>
          <div className={styles.box_wrapper_msg}>
            <Namemodel
              c_style={{ background: "#008080", borderRadius: "50%" }}
              name={"Doc AI"}
            />
            <div>
              {msg.re_type == "html" ? (
                <div className={styles.msg_htmlwrapper}>
                  <div dangerouslySetInnerHTML={{ __html: msg.summary }}></div>
                </div>
              ) : (
                <div className={styles.summary_content}>{msg.summary}</div>
              )}
              {msg.source ? (
                <div className={styles.source_r}>
                  <div>
                    <svg
                      fill="rgba(55, 53, 47, 0.70)"
                      className="settingsConnectedApps"
                      display="block"
                      viewBox="0 0 20 20"
                      style={{
                        width: 20,
                        height: 20,
                        WebkitFlexShrink: "0",
                        MsFlexShrink: "0",
                        flexShrink: "0",
                      }}
                    >
                      <path d="M16.492 3.922C15.695 3.125 14.57 3 13.234 3H7.148c-1.312 0-2.437.125-3.234.922C3.117 4.719 3 5.836 3 7.14v6.03c0 1.337.117 2.446.914 3.243.797.797 1.922.922 3.25.922h6.07c1.336 0 2.461-.125 3.258-.922.797-.797.914-1.906.914-3.242V7.164c0-1.336-.117-2.453-.914-3.242zm-.344 3.023v6.438c0 .812-.101 1.64-.578 2.117-.468.469-1.312.578-2.117.578h-6.5c-.805 0-1.648-.11-2.125-.578-.469-.477-.57-1.305-.57-2.117V6.969c0-.82.101-1.664.57-2.133.477-.477 1.328-.578 2.149-.578h6.476c.805 0 1.649.11 2.117.578.477.476.578 1.305.578 2.11zm-3.492 5.149c.344 0 .57-.266.57-.625V7.78c0-.46-.25-.64-.648-.64h-3.71c-.368 0-.602.226-.602.57s.242.57.617.57h1.422l1.156-.125-1.219 1.133-2.875 2.883a.62.62 0 00-.187.422c0 .351.226.578.57.578.188 0 .336-.07.445-.18l2.875-2.875 1.125-1.203-.117 1.219v1.351c0 .368.227.61.578.61z"></path>
                    </svg>
                  </div>
                  <span>{msg.source}</span>
                </div>
              ) : (
                <></>
              )}
            </div>
            <span
              onClick={() => copylink(msg.Summary)}
              style={{ paddingRight: "20px" }}
            >
              <svg
                fill="rgba(55, 53, 47, 0.85)"
                className="duplicate"
                display="block"
                viewBox="0 0 16 16"
                style={{
                  width: 16,
                  height: 16,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                }}
              >
                <path d="M2.839 12.152H4v1.033c0 1.456.759 2.214 2.242 2.214h6.918c1.477 0 2.242-.758 2.242-2.214V6.212c0-1.456-.765-2.215-2.242-2.215H12V2.965c0-1.456-.766-2.215-2.242-2.215H2.839C1.362.75.597 1.502.597 2.965V9.93c0 1.463.765 2.221 2.242 2.221zm.082-1.34c-.636 0-.984-.328-.984-.99v-6.74c0-.664.348-.999.984-.999h6.76c.63 0 .985.335.985.998v.916H6.243c-1.483 0-2.242.759-2.242 2.215v4.6h-1.08zm3.397 3.248c-.635 0-.977-.329-.977-.992v-6.74c0-.663.342-.991.977-.991h6.761c.629 0 .984.328.984.991v6.74c0 .663-.355.992-.984.992H6.32z"></path>
              </svg>
            </span>
          </div>

          <div className={styles.bottom_options_like}>
            <div className={styles.user_define}>
              {/* <div className={styles.like_unlike}>
                <div className={styles.green}>
                  <ThumbUpAltIcon className={styles.icon_green} />
                </div>
                <div className={styles.red}>
                  <ThumbDownAltIcon className={styles.icon_red} />
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rmodelmsg;
