import styles from "@/styles/home/lhs/header.module.css";
import { useState, useRef } from "react";
import { useContext } from "react";
import { Gcommoncontext } from "@/context/common_global";
import Popuplist from "../reusable/popuplist";
import Namemodel from "../reusable/namemodel";
import uuid from "react-uuid";
import Search from "@/components/search/search";
import { Lhscontext } from "@/context/lhsprovider";
import Gpopup from "../reusable/gpopup";
import Gpopupheader from "../reusable/gpopupheader";
import Pricingplan from "../reusable/pricingplan";
export default function Lheader() {
  const { filemeta } = useContext(Gcommoncontext);
  const { setSeperateFileLhs, setfilelhs } = useContext(Lhscontext);
  const { user } = useContext(Gcommoncontext);

  const [isprofileopt, setisprofileopt] = useState(false);
  const [issortby, setissortby] = useState(false);
  const [ispricing, setispricing] = useState(false);

  const targetElementRef = useRef();
  const profile_optElementRef = useRef();

  // Popup states
  const [issearch, setissearch] = useState(false);

  const handlefileuploading = async (e) => {
    e.preventDefault();
    let date = Date.now();
    let newdoc = [];
    const file = e.target.files[0];
    let fileobj = {
      id: uuid(),
      type: "file",
      slug: "https://www.cs.utexas.edu/~rossbach/cs380p/papers/ulk3.pdf",
      name: "scrum.pdf",
      // name: file.name,
      lastedit: date,
      creation: date,
    };
    newdoc.push(fileobj);

    let result = await setSeperateFileLhs(newdoc);
    // clear all
    setfilelhs([]);
  };

  const logout_function = () => {
    // clear cookies here
    // All tokens also and navigate to login page.
    document.cookie =
      "documentiatoken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie =
      "documentiauser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return (window.location.href = "/signin");
  };

  function activate_upload_widget() {
    document
      .querySelector("[data-sec-lhswrapper]")
      .classList.remove("lhs_mob_active");
    document.querySelector("[data-newchat-widget]").click();
  }
  function handleClose(action) {
    switch (action) {
      case "profile_opt":
        setisprofileopt(false);
        break;
      case "sortby":
        setissortby(false);
        break;
      // Add more cases if needed
      case "search":
        setissearch(false);
        break;
      case "pricing":
        setispricing(false);
      default:
      // Handle default case if necessary
    }
  }

  return (
    <>
      <header className={styles.lhs_header_content}>
        <div
          ref={profile_optElementRef}
          className={`${styles.header_intro_user} ${styles.header_ots}`}
          onClick={() => setisprofileopt(true)}
        >
          <div data-g-popup-tab className={styles.first_sec}>
            <Namemodel name={user.username} />
            <div className={styles.header_user_cont}>
              <span>Welcome, {user.username}</span>
              <div id={styles.uid}>{user.email}</div>
            </div>
          </div>
        </div>
        {filemeta?.length > 0 ? (
          <div className={styles.header_ots_content}>
            <div>
              <div
                className={styles.header_ots}
                onClick={() => setissearch(true)}
              >
                <div>
                  <svg
                    fill="rgba(55, 53, 47, 0.45)"
                    className="sidebarSearch"
                    display="block"
                    viewBox="0 0 20 20"
                    style={{
                      width: 20,
                      height: "100%",
                      WebkitFlexShrink: "0",
                      MsFlexShrink: "0",
                      flexShrink: "0",
                    }}
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.246 8.82c0-.765.144-1.483.43-2.153A5.673 5.673 0 014.88 4.89a5.457 5.457 0 013.93-1.634c.77 0 1.49.143 2.16.43a5.523 5.523 0 011.778 1.204c.51.51.91 1.103 1.196 1.777.292.67.438 1.388.438 2.153 0 .602-.094 1.174-.28 1.716a5.496 5.496 0 01-.76 1.484l3.118 3.13a.842.842 0 01.212.322c.05.123.075.253.075.39 0 .19-.043.364-.13.519a.983.983 0 01-.875.499c-.137 0-.269-.025-.396-.075a.927.927 0 01-.335-.22l-3.138-3.137a5.801 5.801 0 01-1.435.69 5.33 5.33 0 01-1.627.247 5.457 5.457 0 01-2.16-.43 5.6 5.6 0 01-1.771-1.197c-.51-.51-.912-1.1-1.203-1.77a5.475 5.475 0 01-.43-2.168zm1.456 0c0 .57.105 1.103.315 1.6.214.497.51.934.888 1.312.379.374.816.668 1.313.882a3.98 3.98 0 001.593.321c.57 0 1.102-.107 1.6-.32a4.154 4.154 0 002.194-2.195c.214-.497.32-1.03.32-1.6a3.98 3.98 0 00-.32-1.592 4.177 4.177 0 00-.89-1.313 4.006 4.006 0 00-1.305-.882 3.997 3.997 0 00-1.6-.321 3.98 3.98 0 00-1.592.321c-.497.21-.934.504-1.313.882a4.178 4.178 0 00-.888 1.313 4.054 4.054 0 00-.315 1.592z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <span>Search docs</span>
              </div>
            </div>

            <div>
              <div
                className={styles.header_ots}
                onClick={() => setissortby(true)}
                ref={targetElementRef}
              >
                <span>
                  <svg
                    className="settingsIntegration"
                    display="block"
                    viewBox="0 0 20 20"
                    style={{
                      width: 18,
                      height: 18,
                      WebkitFlexShrink: "0",
                      MsFlexShrink: "0",
                      flexShrink: "0",
                      fill: "rgba(55, 53, 47, 0.45)",
                    }}
                  >
                    <path d="M4.633 9.42h3.154c1.093 0 1.632-.532 1.632-1.656V4.655C9.42 3.532 8.88 3 7.787 3H4.633C3.532 3 3 3.532 3 4.655v3.109c0 1.124.532 1.655 1.633 1.655zm7.58 0h3.162C16.468 9.42 17 8.887 17 7.763V4.655C17 3.532 16.468 3 15.374 3h-3.16c-1.094 0-1.633.532-1.633 1.655v3.109c0 1.124.539 1.655 1.633 1.655zm-7.58-1.251c-.262 0-.382-.135-.382-.405V4.648c0-.27.12-.405.382-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405H4.633zm7.588 0c-.262 0-.39-.135-.39-.405V4.648c0-.27.128-.405.39-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405h-3.146zM4.633 17h3.154c1.093 0 1.632-.532 1.632-1.655v-3.109c0-1.124-.539-1.655-1.632-1.655H4.633C3.532 10.58 3 11.112 3 12.236v3.109C3 16.468 3.532 17 4.633 17zm7.58 0h3.162C16.468 17 17 16.468 17 15.345v-3.109c0-1.124-.532-1.655-1.626-1.655h-3.16c-1.094 0-1.633.531-1.633 1.655v3.109c0 1.123.539 1.655 1.633 1.655zm-7.58-1.25c-.262 0-.382-.128-.382-.398v-3.116c0-.277.12-.405.382-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397H4.633zm7.588 0c-.262 0-.39-.128-.39-.398v-3.116c0-.277.128-.405.39-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397h-3.146z"></path>
                  </svg>
                </span>
                <span>Sort by</span>
              </div>
            </div>

            <div>
              <div
                className={styles.header_ots}
                onClick={() => setispricing(true)}
                ref={targetElementRef}
              >
                <span>
                  <svg
                    viewBox="0 0 20 20"
                    style={{
                      width: 20,
                      height: 20,
                      WebkitFlexShrink: "0",
                      MsFlexShrink: "0",
                      flexShrink: "0",
                      fill: "rgba(55, 53, 47, 0.45)",
                    }}
                    fill="inherit"
                    className="settingsUpgrade"
                    display="block"
                  >
                    <path d="M9.969 17.938c4.36 0 7.969-3.618 7.969-7.97C17.938 5.61 14.32 2 9.96 2 5.609 2 2 5.61 2 9.969c0 4.351 3.617 7.969 7.969 7.969zm0-1.329a6.609 6.609 0 01-6.633-6.64 6.602 6.602 0 016.625-6.64 6.627 6.627 0 016.648 6.64 6.61 6.61 0 01-6.64 6.64zm0-2.734a.562.562 0 00.586-.586V9.383l-.063-1.656.797.945.922.937a.52.52 0 00.414.172c.32 0 .57-.242.57-.562a.566.566 0 00-.164-.406L10.43 6.219c-.149-.149-.29-.227-.461-.227-.164 0-.297.07-.453.227l-2.61 2.593a.555.555 0 00-.148.407c0 .32.242.562.562.562a.572.572 0 00.414-.172l.93-.937.781-.938-.062 1.649v3.906c0 .344.25.586.586.586z"></path>
                  </svg>
                </span>
                <span>Upgrade</span>
              </div>
            </div>

            <div>
              <label
                onClick={() => activate_upload_widget()}
                htmlFor="add_doc"
                className={styles.new_content}
              >
                <span>
                  <svg
                    fill="var(--app-color-code)"
                    className="file"
                    display="block"
                    viewBox="0 0 16 16"
                    style={{
                      width: 20,
                      height: 20,
                      WebkitFlexShrink: "0",
                      MsFlexShrink: "0",
                      flexShrink: "0",
                      marginRight: 5,
                    }}
                  >
                    <path d="M4.356 15.468h7.28c1.464 0 2.222-.773 2.222-2.242v-6.2c0-.95-.123-1.388-.717-1.99l-3.59-3.65C8.979.805 8.507.668 7.652.668H4.356c-1.462 0-2.221.772-2.221 2.242v10.316c0 1.476.759 2.242 2.221 2.242zm.11-1.34c-.663 0-.991-.349-.991-.984V2.992c0-.629.328-.984.99-.984h2.913v3.746c0 .977.485 1.45 1.456 1.45h3.685v5.94c0 .635-.335.984-.998.984H4.466zm4.491-8.1c-.28 0-.396-.124-.396-.404V2.192l3.773 3.835H8.957zm-.362 6.699v-2.1L8.54 9.563l.526.553.527.533a.531.531 0 00.396.185c.308 0 .54-.219.54-.526a.49.49 0 00-.191-.404L8.45 8.167c-.157-.144-.287-.205-.458-.205-.164 0-.294.061-.451.205L5.655 9.903a.49.49 0 00-.191.404c0 .307.225.526.54.526a.543.543 0 00.396-.185l.527-.533.526-.553-.055 1.066v2.099c0 .328.274.574.595.574.328 0 .602-.246.602-.574z"></path>
                  </svg>
                </span>
                <input
                  style={{ display: "none" }}
                  disabled
                  onChange={handlefileuploading}
                  type="file"
                  id="add_doc"
                />
                <span>Add new document</span>
              </label>
            </div>
          </div>
        ) : (
          <></>
        )}
      </header>
      <div data-lhs-collapse className={styles.collapsableblock}>
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="black"
            className="undo"
            display="block"
            viewBox="0 0 16 16"
            style={{
              width: 16,
              height: 16,
              WebkitFlexShrink: "0",
              MsFlexShrink: "0",
              flexShrink: "0",
              transform: "rotate(180deg)",
            }}
          >
            <path
              fillRule="evenodd"
              d="M3.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L9.293 8 3.646 2.354a.5.5 0 0 1 0-.708z"
            />
            <path
              fillRule="evenodd"
              d="M7.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L13.293 8 7.646 2.354a.5.5 0 0 1 0-.708z"
            />
          </svg>
        </span>
      </div>
      <Gpopup
        id="profile_opt"
        isOpen={isprofileopt}
        onClose={() => handleClose("profile_opt")}
        targetElement={profile_optElementRef.current}
      >
        <Popuplist
          list={[
            {
              name: "Logout",
              callback: logout_function,
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgba(55, 53, 47, 0.85)"
                  className="bi bi-people-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5" />
                </svg>
              ),
            },
          ]}
        />
      </Gpopup>
      <Gpopup
        id="sortby"
        isOpen={issortby}
        onClose={() => handleClose("sortby")}
        targetElement={targetElementRef.current}
      >
        <Popuplist
          list={[
            {
              name: "By Creation date ",
              callback: () => null,
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgba(55, 53, 47, 0.85)"
                  className="bi bi-calendar-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              ),
            },
            {
              name: "By updated date",
              callback: () => null,
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgba(55, 53, 47, 0.85)"
                  className="bi bi-calendar-plus"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 7a.5.5 0 0 1 .5.5V9H10a.5.5 0 0 1 0 1H8.5v1.5a.5.5 0 0 1-1 0V10H6a.5.5 0 0 1 0-1h1.5V7.5A.5.5 0 0 1 8 7" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              ),
            },
          ]}
        />
      </Gpopup>
      <Gpopup
        id="doc-newchat"
        isOpen={issearch}
        onClose={() => handleClose("search")}
      >
        <>
          <Gpopupheader
            content={"Search Docs"}
            close={() => handleClose("search")}
          />
          <Search close={() => handleClose("search")} />
        </>
      </Gpopup>
      <Gpopup
        id="doc-newchat"
        isOpen={ispricing}
        onClose={() => handleClose("pricing")}
      >
        <>
          <Gpopupheader
            content={"Select best plan for you"}
            close={() => handleClose("pricing")}
          />
          <Pricingplan close={() => handleClose("pricing")} />
        </>
      </Gpopup>
    </>
  );
}
