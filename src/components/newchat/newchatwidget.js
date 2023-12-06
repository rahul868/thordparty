import useDragandDrop from "@/hooks/useDragandDrop";
import { useState, useEffect } from "react";
import styles from "@/styles/newchat/newchat.module.css";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
import Popup from "../home/reusable/popup";
import Reset from "../home/reusable/reset";
function Rnewchat() {
  const context = useContext(Rhscontext);

  const { files, setfiles } = context;
  const { dragfunc } = useDragandDrop();
  const [isGroup, setisGroup] = useState(false);

  useEffect(() => {
    dragfunc(files);
  }, [files]);

  console.log(files);

  const handleFileChange = (e) => {
    if (files.length > 0) {
      let newAddedFiles = Array.from(files);
      console.log(files);
      for (let i = 0; i < e.target.files.length; i++) {
        newAddedFiles.push(e.target.files[i]);
      }
      setfiles(newAddedFiles);
    } else {
      setfiles(Array.from(e.target.files));
    }
  };

  function removeDoc(e, i) {
    e.preventDefault();
    e.stopPropagation();
    const newarr = [...files];
    newarr.splice(i, 1);
    setfiles(newarr);
  }

  function simple(e) {
    setisGroup(e.target.checked);
  }

  function addDoc(e) {
    e.preventDefault();
    if (isGroup) {
      let newSavedchatadded = [];
      for (let i = 0; i < files.length; i++) {
        newSavedchatadded.push({
          filename: files[i].name,
          Lastedit: "now",
        });
      }
      let groupCreate = {
        type: "group",
        filename: "Untiled Group Chat",
        file: [...newSavedchatadded],
      };

      setSavedChat([groupCreate, ...SavedChat]);
      setSelectedFile(groupCreate);
      naviget(`/home/detail/${groupCreate.filename}`);
    } else {
      let newSavedchatadded = [];
      for (let i = 0; i < files.length; i++) {
        newSavedchatadded.push({
          type: "file",
          filename: files[i].name,
          Lastedit: "now",
        });
      }
      setSavedChat([...newSavedchatadded, ...SavedChat]);
      setSelectedFile(newSavedchatadded[0]);
      naviget(`/home/detail/${newSavedchatadded[0].filename}`);
    }
  }

  return (
    <>
      <div className={styles.right_create_chat}>
        <div className={styles.middle_upload_sec}>
          <div className={styles.middle_upload}>
            {/* <div className={styles.upload_widget_title}>
              <h3>Upload Files</h3>
              <span>Add your document here. You can add upto 5 files.</span>
            </div> */}
            <label id="drop-area" htmlFor="fileElem">
              {/* {files.length <= 0 && ( */}
              <input
                type="file"
                id="fileElem"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
              {/* )} */}
              {files.length > 0 ? (
                <>
                  <div className={styles.upload_indicator}>
                    <div className={styles.uplaod_sub_indicator}>
                      <div className={styles.from_files_show_all}>
                        <div className={styles.check}>
                          <h3>{files.length} Documents Selected</h3>
                          <span>Click anywhere in widget to select more</span>
                        </div>
                        {files?.map((item, index) => (
                          <div key={index} className={styles.inputs_file}>
                            <div className={styles.name_or_icon}>
                              <div>
                                <svg
                                  role="graphics-symbol"
                                  viewBox="0 0 16 16"
                                  class="page"
                                  style={{
                                    width: 18,
                                    height: 18,
                                    display: "block",
                                    fill: "rgba(55, 53, 47, 0.70)",
                                    flexShrink: 0,
                                  }}
                                >
                                  <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
                                </svg>
                              </div>
                              <span>{item.name}</span>
                            </div>
                            <span
                              className={styles.close_file}
                              onClick={(e) => removeDoc(e, index)}
                            >
                              &times;
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className={styles.two_btns_uploading}>
                        <div className={styles.new_chat} onClick={addDoc}>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="feather feather-upload-cloud"
                          >
                            <polyline points="16 16 12 12 8 16"></polyline>
                            <line x1="12" y1="12" x2="12" y2="21"></line>
                            <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
                            <polyline points="16 16 12 12 8 16"></polyline>
                          </svg>
                          &nbsp; &nbsp; New Chat
                        </div>
                        <div>
                          <div
                            data-g-popup-tab
                            className={styles.conditon_upload}
                          >
                            <input type="checkbox" onChange={simple} />
                            <span>upload all docs as a Group Chat</span>
                          </div>
                          <Popup custom_styles_width={{ minWidth: 150 }}>
                            <Reset />
                          </Popup>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.upload_widget_title}>
                    <h3>Upload Files</h3>
                    <span>
                      Add your document here. You can add upto 5 files.
                    </span>
                  </div>
                  <div className={styles.icon_upload}>
                    <div className={styles.icon}>
                      <svg
                        fill="white"
                        className="pageEmpty"
                        display="block"
                        viewBox="0 0 16 16"
                        style={{
                          width: 18,
                          height: 18,
                          WebkitFlexShrink: "0",
                          MsFlexShrink: "0",
                          flexShrink: "0",
                        }}
                      >
                        <path d="M4.356 15.468h7.28c1.464 0 2.222-.773 2.222-2.242v-6.2c0-.95-.123-1.388-.717-1.99l-3.59-3.65C8.979.805 8.507.668 7.652.668H4.356c-1.462 0-2.221.772-2.221 2.242v10.316c0 1.476.759 2.242 2.221 2.242zm.11-1.34c-.663 0-.991-.349-.991-.984V2.992c0-.629.328-.984.99-.984h2.913v3.746c0 .977.485 1.45 1.456 1.45h3.685v5.94c0 .635-.335.984-.998.984H4.466zm4.491-8.1c-.28 0-.396-.124-.396-.404V2.192l3.773 3.835H8.957z"></path>
                      </svg>
                    </div>
                    <span>Choose files or drag & drop it here.</span>
                    <span className={styles.warning}>
                      Max 100Mb file is allowed.
                    </span>
                  </div>
                  {/* <div style={{ fontSize: "12px", color: "#4444" }}>or</div>
                  <div className={styles.btn_for_other}>
                    <span id={styles.file_1}>
                      <span>Select File</span>
                    </span>
                  </div>
                  <span id={styles.upload_p}>
                    Upload & Chat with Multiple Docs
                  </span>
                  {files.map((file) => {
                    return <p key={file.name}>{file.name}</p>;
                  })} */}
                </>
              )}
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rnewchat;
