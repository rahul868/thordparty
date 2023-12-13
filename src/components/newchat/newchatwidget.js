import useDragandDrop from "@/hooks/useDragandDrop";
import { useState, useEffect } from "react";
import styles from "@/styles/newchat/newchat.module.css";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
import { Gcommoncontext } from "@/context/common_global";
import Button from "../home/reusable/button";
import uuid from "react-uuid";

function Rnewchat() {
  const { limit_string } = useContext(Gcommoncontext);
  const Rcontext = useContext(Rhscontext);

  const { files, setfiles, setUserGroup, setSeperateFiles } = Rcontext;

  const { dragfunc } = useDragandDrop();
  const [grpname, setGrpname] = useState("");
  const [isGroup, setisGroup] = useState(false);

  useEffect(() => {
    dragfunc(files);
  }, [files]);

  const handleFileChange = (e) => {
    const maxFiles = 5;

    // Check if the total number of files doesn't exceed the limit
    if (files.length < maxFiles) {
      let newAddedFiles = Array.from(files);

      // Calculate the remaining slots for files
      const remainingSlots = maxFiles - newAddedFiles.length;

      // Add files up to the remaining available slots
      for (
        let i = 0;
        i < Math.min(e.target.files.length, remainingSlots);
        i++
      ) {
        newAddedFiles.push(e.target.files[i]);
      }

      // Update the state with the new files
      setfiles(newAddedFiles);
    } else {
      // Display an error or some indication that the limit is reached
      console.log("You can only select up to 5 files.");
    }
  };

  function removeDoc(e, i) {
    e.preventDefault();
    e.stopPropagation();
    const newarr = [...files];
    newarr.splice(i, 1);
    if (newarr.length <= 0) {
      setfiles([]);
      setGrpname("");
      setisGroup(false);
      return;
    }
    setfiles(newarr);
  }

  function simple(e) {
    setisGroup(e.target.checked);
  }

  async function addGroupfile(e) {
    e.preventDefault();

    let date = Date.now();
    let newSavedchatadded = [];
    for (let i = 0; i < files.length; i++) {
      newSavedchatadded.push({
        type: "file",
        id: uuid(),
        slug: "https://drive.uqu.edu.sa/_/mskhayat/files/MySubjects/2017SS%20Operating%20Systems/Abraham%20Silberschatz-Operating%20System%20Concepts%20(9th,2012_12).pdf",
        creation: date,
        lastedit: date,
        name: "health.pdf",
        // name:files[i].name,
      });
    }
    let group_create = {
      id: uuid(),
      groupname: grpname,
      type: "group",
      childs: [...newSavedchatadded],
      // lastedit: date,
      // creation: date,
    };

    await setUserGroup(group_create);

    // clear all rhs temp files
    setfiles([]);
    setGrpname("");
    setisGroup(false);
  }

  async function addSingelfile(e) {
    e.preventDefault();
    let date = Date.now();
    let newSavedchatadded = [];
    for (let i = 0; i < files.length; i++) {
      newSavedchatadded.push({
        id: uuid(),
        type: "file",
        slug: "https://drive.uqu.edu.sa/_/mskhayat/files/MySubjects/2017SS%20Operating%20Systems/Abraham%20Silberschatz-Operating%20System%20Concepts%20(9th,2012_12).pdf",
        name: "resume.pdf",
        // name: files[i].name,
        lastedit: date,
        creation: date,
      });
    }
    await setSeperateFiles(newSavedchatadded);
    // clear all
    setfiles([]);
    setGrpname("");
    setisGroup(false);
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
            <label
              id="drop-area"
              htmlFor={files.length !== 5 ? "fileElem" : ""}
            >
              {/* {files.length <= 0 && ( */}
              <input
                type="file"
                id="fileElem"
                multiple
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />

              {files?.length > 0 ? (
                <>
                  <div className={styles.upload_indicator}>
                    <div className={styles.uplaod_sub_indicator}>
                      <div className={styles.from_files_show_all}>
                        <div className={styles.check}>
                          <label>{files.length} Documents Selected</label>
                          <span>Click anywhere in widget to select more</span>
                        </div>
                        {files?.map((item, index) => (
                          <div key={index} className={styles.inputs_file}>
                            <div className={styles.name_or_icon}>
                              <div>
                                <svg
                                  role="graphics-symbol"
                                  viewBox="0 0 16 16"
                                  className="page"
                                  style={{
                                    width: 18,
                                    height: 18,
                                    display: "block",
                                    fill: "rgba(55, 53, 47, 0.70)",
                                    flexShrink: 0,
                                  }}
                                >
                                  <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM4.95703 6.02734C4.67676 6.02734 4.56055 5.9043 4.56055 5.62402V2.19238L8.334 6.02734H4.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
                                </svg>
                              </div>
                              <span>{limit_string(item.name, 22)}</span>
                            </div>
                            <span
                              className={styles.close_file}
                              onClick={(e) => removeDoc(e, index)}
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
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className={styles.two_btns_uploading}>
                        <div className={styles.two_btns}>
                          <div className={styles.conditon_upload}>
                            <input
                              type="checkbox"
                              value={grpname}
                              onChange={simple}
                            />
                            <span>Upload all docs as a Group Chat</span>
                          </div>
                          <br />
                          {isGroup ? (
                            <div className={styles.groupname_container}>
                              <input
                                type="text"
                                placeholder="Type group name here..."
                                id={styles.grpname_input}
                                onChange={(e) => setGrpname(e.target.value)}
                              />
                            </div>
                          ) : (
                            <></>
                          )}
                          {!isGroup ? (
                            <>
                              <Button
                                title={"Create Chat"}
                                callback={addSingelfile}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                          {isGroup && grpname !== "" ? (
                            <>
                              <Button
                                title={"Create Chat"}
                                callback={addGroupfile}
                              />
                            </>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={styles.upload_widget_title}></div>
                  <div className={styles.icon_upload}>
                    <img src="/assets/svg/upload.svg" />
                    <span>
                      Drag & drop it here or <br />
                      <span style={{ color: "brown", fontWeight: "bold" }}>
                        browse files
                      </span>
                      <br />
                    </span>
                  </div>
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
