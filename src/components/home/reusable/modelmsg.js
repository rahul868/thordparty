import { Gcommoncontext } from "@/context/common_global";
import styles from "@/styles/home/rhs/model.module.css";
import { useContext, useState } from "react";

function Rmodelmsg({ msg }) {
  const { setiopen, setimsg, setitype } = useContext(Gcommoncontext);

  const copylink = (msg) => {
    // Create a temporary textarea element
    let textarea = document.createElement("textarea");

    // Set the value of the textarea to the text you want to copy
    textarea.value = msg;

    // Append the textarea element to the document
    document.body.appendChild(textarea);

    // Select the text in the textarea
    textarea.select();

    // Execute the copy command
    document.execCommand("copy");

    // Remove the temporary textarea element
    document.body.removeChild(textarea);

    setimsg("Answer is copied to clipboard.");
    setitype("s");
    setiopen(true);
  };

  return (
    <>
      <div className={styles.msg_for_ai}>
        <div className={styles.msg_sub_for_ai}>
          <div className={styles.box_wrapper_msg}>
            {/* <Namemodel
              c_style={{ background: "#008080", borderRadius: "50%" }}
              name={"Doc AI"}
            /> */}
            <img src="assets/images/favicon.png" alt="documential_model" />
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
                  <div
                    className={styles.modelmsg_source}
                    dangerouslySetInnerHTML={{ __html: msg.source }}
                  ></div>
                </div>
              ) : (
                <></>
              )}
            </div>
            <span
              className={styles.copysvg_model}
              onClick={() => copylink(msg.summary)}
              // style={{ paddingRight: "20px" }
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
