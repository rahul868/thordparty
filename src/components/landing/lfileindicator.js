import useDragandDrop from "@/hooks/useDragandDrop";
import { useState, useEffect } from "react";
import styles from "@/styles/landing/lfileupload.module.css";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
import { Gcommoncontext } from "@/context/common_global";
import Button from "../home/reusable/button";
import uuid from "react-uuid";
import Gpopup from "../home/reusable/gpopup";
import Gpopupheader from "../home/reusable/gpopupheader";
import Groupname from "./groupinput";

function Lfileindicator() {
  const { limit_string, setisfirstupload } = useContext(Gcommoncontext);
  const {
    files,
    setfiles,
    setUserGroup,
    setSeperateFiles,
    startUpload,
    setprogress,
  } = useContext(Rhscontext);

  const { dragfunc } = useDragandDrop();
  const [grpname, setGrpname] = useState("");
  const [isGroup, setisGroup] = useState(false);
  const [isGroupPop, setisGroupPop] = useState(false);
  useEffect(() => {
    dragfunc(files);
  }, [files]);

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
    if (!e.target.checked) {
      setGrpname("");
    }
    setisGroupPop(e.target.checked);
  }

  async function addGroupfile(e) {
    setisfirstupload(true);
    e.preventDefault();
    let result = await startUpload();
    let { success, doc } = result;
    if (!success || doc.length <= 0) {
      return;
    }
    let date = Date.now();
    let newSavedchatadded = [];
    for (let i = 0; i < result.doc.length; i++) {
      newSavedchatadded.push({
        type: "file",
        id: uuid(),
        slug: doc[i].slug,
        name: doc[i].name,
        creation: date,
        lastedit: date,
      });
    }

    // Gnerating schema for group creation by user.
    let group_create = {
      id: uuid(),
      groupname: grpname,
      type: "group",
      childs: [...newSavedchatadded],
    };

    // Upading users Document history with new group
    await setUserGroup(group_create);

    // clear all rhs temp files
    setprogress([]);
    setfiles([]);
    setGrpname("");
    setisGroup(false);
  }

  async function addSingelfile(e) {
    setisfirstupload(true);
    e.preventDefault();
    let result = await startUpload();
    let { success, doc } = result;
    if (!success || doc.length <= 0) {
      return;
    }

    let date = Date.now();
    let newSavedchatadded = [];
    for (let i = 0; i < result.doc.length; i++) {
      if (doc[i].status == "success") {
        newSavedchatadded.push({
          id: uuid(),
          type: "file",
          slug: doc[i].slug,
          name: doc[i].name,
          lastedit: date,
          creation: date,
        });
      }
    }
    // Call API process for further process.
    await setSeperateFiles(newSavedchatadded);
    // clear all
    setprogress([]);
    setfiles([]);
    setGrpname("");
    setisGroup(false);
    setisfirstupload(false);
  }

  function close_grouppop() {
    setGrpname("");
    setisGroup(false);
    setisGroupPop(false);
  }

  function onlyclose() {
    setisGroupPop(false);
    console.log(grpname);
  }

  if (files.length > 0) {
    return (
      <div className={styles.upload_indicator}>
        <div className={styles.uplaod_sub_indicator}>
          <div className={styles.from_files_show_all}>
            <div className={styles.check}>
              <h2>{files.length} Documents Selected</h2>
              <span>You are uploading below files</span>
            </div>
            {files?.map((item, index) => (
              <div key={index} className={styles.inputs_file}>
                <div className={styles.name_or_icon}>
                  <div className={styles.svgwrapper}>
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
              <label className={styles.conditon_upload}>
                <input type="checkbox" checked={isGroup} onChange={simple} />
                <span>Upload all docs as a Group {grpname ? grpname : ""}</span>
              </label>
              <br />
              <div className={styles.landinguploading_trigger}>
                {!isGroup ? <></> : <></>}
                {isGroup && grpname !== "" ? (
                  <>
                    <Button
                      title={"Create Group Chat"}
                      callback={addGroupfile}
                    />
                  </>
                ) : (
                  <>
                    <Button title={"Start Chat"} callback={addSingelfile} />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
        <Gpopup
          id="doc-reset"
          isOpen={isGroupPop}
          c_ostyle={{ backdropFilter: "blur(2px)" }}
          onClose={() => close_grouppop()}
        >
          <Gpopupheader
            content={"Name for group"}
            close={() => close_grouppop()}
          />
          <Groupname
            close={() => close_grouppop()}
            onlyclose={onlyclose}
            inputchange={setGrpname}
          />
        </Gpopup>
      </div>
    );
  }
}

export default Lfileindicator;
