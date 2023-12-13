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
export default function Lheader() {
  const { filemeta } = useContext(Gcommoncontext);
  const { setSeperateFileLhs, setfilelhs } = useContext(Lhscontext);
  const { user } = useContext(Gcommoncontext);

  const [isprofileopt, setisprofileopt] = useState(false);
  const [issortby, setissortby] = useState(false);

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
    console.log("dd", fileobj);
    newdoc.push(fileobj);

    let result = await setSeperateFileLhs(newdoc);
    // clear all
    setfilelhs([]);
  };

  const logout_function = () => {
    // clear cookies here
    // All tokens also and navigate to login page.
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    return (window.location.href = "https://www.documentia.ai/signin");
  };

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
            <Namemodel name={user.name} />
            <div className={styles.header_user_cont}>
              <span>Welcome, {user.name}</span>
              <div id={styles.uid}>{user.email}</div>
            </div>
          </div>
          <div data-lhs-collapse className={styles.collapsableblock}>
            <span>
              <svg
                fill="rgba(55, 53, 47, 0.85)"
                className="undo"
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
                <path d="M14.542 10.683c0-2.714-1.832-4.58-4.942-4.58H5.293l-1.586.068L4.91 5.152l1.764-1.715a.703.703 0 00.219-.52c0-.417-.294-.725-.739-.725a.82.82 0 00-.54.233L1.69 6.294a.761.761 0 000 1.107l3.924 3.87c.15.143.356.232.54.232.445 0 .739-.308.739-.732a.726.726 0 00-.22-.519L4.91 8.536 3.707 7.524l1.586.069h4.354c2.202 0 3.412 1.25 3.412 3.028 0 1.784-1.21 3.09-3.412 3.09H8.055a.735.735 0 00-.76.752c0 .41.315.745.76.745h1.64c3.056 0 4.847-1.798 4.847-4.525z"></path>
              </svg>
            </span>
          </div>
        </div>

        <div className={styles.header_ots_content}>
          <div className={styles.header_ots}>
            <div>
              <svg
                role="graphics-symbol"
                viewBox="0 0 20 20"
                class="sidebarUpdates"
                style={{
                  width: 20,
                  height: "100%",
                  display: "block",
                  fill: "rgba(55, 53, 47, 0.45)",
                  flexShrink: 0,
                }}
              >
                <path d="M6.87695 10.8601C6.72038 10.8601 6.58708 10.8072 6.47705 10.7014C6.37126 10.5956 6.31836 10.4644 6.31836 10.3079C6.31836 10.1555 6.37126 10.0264 6.47705 9.92065C6.58708 9.81486 6.72038 9.76196 6.87695 9.76196H9.44775V6.24536C9.44775 6.08879 9.50065 5.9576 9.60645 5.85181C9.71224 5.74601 9.84131 5.69312 9.99365 5.69312C10.1502 5.69312 10.2814 5.74601 10.3872 5.85181C10.493 5.9576 10.5459 6.08879 10.5459 6.24536V10.3079C10.5459 10.4644 10.493 10.5956 10.3872 10.7014C10.2814 10.8072 10.1502 10.8601 9.99365 10.8601H6.87695ZM10 16.6174C9.0944 16.6174 8.2417 16.4439 7.44189 16.0969C6.64209 15.7542 5.9375 15.2781 5.32812 14.6687C4.71875 14.0593 4.24056 13.3569 3.89355 12.5613C3.55078 11.7615 3.37939 10.9067 3.37939 9.99683C3.37939 9.09123 3.55078 8.24064 3.89355 7.44507C4.24056 6.64526 4.71663 5.94067 5.32178 5.3313C5.93115 4.72192 6.63574 4.24585 7.43555 3.90308C8.23535 3.55607 9.08805 3.38257 9.99365 3.38257C10.8993 3.38257 11.752 3.55607 12.5518 3.90308C13.3558 4.24585 14.0604 4.72192 14.6655 5.3313C15.2749 5.94067 15.7531 6.64526 16.1001 7.44507C16.4471 8.24064 16.6206 9.09123 16.6206 9.99683C16.6206 10.9067 16.4471 11.7615 16.1001 12.5613C15.7531 13.3569 15.2749 14.0593 14.6655 14.6687C14.0604 15.2781 13.3579 15.7542 12.5581 16.0969C11.7583 16.4439 10.9056 16.6174 10 16.6174ZM10 15.1638C10.7152 15.1638 11.3838 15.0305 12.0059 14.7639C12.6322 14.4973 13.1823 14.1292 13.6562 13.6594C14.1302 13.1855 14.5005 12.6375 14.7671 12.0154C15.0337 11.3891 15.167 10.7162 15.167 9.99683C15.167 9.28166 15.0316 8.61304 14.7607 7.99097C14.4941 7.36466 14.1239 6.81453 13.6499 6.34058C13.1802 5.86662 12.6322 5.49634 12.0059 5.22974C11.3838 4.96313 10.7131 4.82983 9.99365 4.82983C9.27848 4.82983 8.60775 4.96313 7.98145 5.22974C7.35938 5.49634 6.81136 5.86662 6.3374 6.34058C5.86768 6.81453 5.49951 7.36466 5.23291 7.99097C4.97054 8.61304 4.83936 9.28166 4.83936 9.99683C4.83936 10.7162 4.97054 11.3891 5.23291 12.0154C5.49951 12.6375 5.86979 13.1855 6.34375 13.6594C6.81771 14.1292 7.36572 14.4973 7.98779 14.7639C8.6141 15.0305 9.28483 15.1638 10 15.1638Z"></path>
              </svg>
            </div>
            <span>Profile options</span>
          </div>

          {filemeta?.length > 0 && (
            <>
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
                {/* <Popup
                custom_styles_width={{ minWidth: 200, header: 400 }}
                custom_styles={{ position: "absolute", top: 145, left: 250 }}
              >
                <Popuplist
                  list={[
                    {
                      name: "By creation date",
                      callback: () => {
                        console.log("Helo callback");
                      },
                      svg: (
                        <svg
                          role="graphics-symbol"
                          viewBox="0 0 20 20"
                          class="settingsMembers"
                          style={{
                            width: 18,
                            height: 18,
                            display: "block",
                            fill: "rgba(55, 53, 47, 0.85)",
                            flexShrink: 0,
                          }}
                        >
                          <path d="M13.726 9.989c1.725 0 3.123-1.585 3.123-3.536 0-1.92-1.39-3.453-3.123-3.453-1.712 0-3.124 1.556-3.124 3.468.008 1.943 1.405 3.52 3.123 3.52zm-8.264.171c1.504 0 2.716-1.392 2.716-3.111 0-1.675-1.212-3.03-2.716-3.03-1.49 0-2.724 1.378-2.717 3.037 0 1.72 1.22 3.104 2.717 3.104zm8.264-1.474c-.985 0-1.819-.967-1.819-2.225 0-1.213.827-2.159 1.819-2.159.998 0 1.818.93 1.818 2.151 0 1.25-.827 2.233-1.819 2.233zm-8.264.186c-.806 0-1.49-.803-1.49-1.816 0-.967.677-1.756 1.49-1.756.827 0 1.497.774 1.497 1.749 0 1.02-.684 1.823-1.497 1.823zM1.54 17h5.54c-.392-.238-.656-.782-.606-1.273H1.476c-.136 0-.193-.067-.193-.193 0-1.705 1.911-3.327 4.172-3.327.798 0 1.597.208 2.21.566.242-.365.542-.678.934-.946-.906-.58-2.032-.893-3.144-.893C2.438 10.934 0 13.182 0 15.653 0 16.546.513 17 1.54 17zm7.743 0h8.885C19.4 17 20 16.59 20 15.712c0-2.046-2.453-4.77-6.274-4.77-3.822 0-6.275 2.724-6.275 4.77 0 .879.599 1.288 1.832 1.288zm-.228-1.303c-.164 0-.228-.059-.228-.193 0-1.139 1.761-3.26 4.899-3.26 3.137 0 4.898 2.121 4.898 3.26 0 .134-.064.194-.235.194H9.055z"></path>
                        </svg>
                      ),
                    },
                    {
                      name: "By update date",
                      callback: () => {
                        console.log("Helo callback");
                      },
                      svg: (
                        <svg
                          role="graphics-symbol"
                          viewBox="0 0 20 20"
                          class="settingsMembers"
                          style={{
                            width: 18,
                            height: 18,
                            display: "block",
                            fill: "rgba(55, 53, 47, 0.85)",
                            flexShrink: 0,
                          }}
                        >
                          <path d="M13.726 9.989c1.725 0 3.123-1.585 3.123-3.536 0-1.92-1.39-3.453-3.123-3.453-1.712 0-3.124 1.556-3.124 3.468.008 1.943 1.405 3.52 3.123 3.52zm-8.264.171c1.504 0 2.716-1.392 2.716-3.111 0-1.675-1.212-3.03-2.716-3.03-1.49 0-2.724 1.378-2.717 3.037 0 1.72 1.22 3.104 2.717 3.104zm8.264-1.474c-.985 0-1.819-.967-1.819-2.225 0-1.213.827-2.159 1.819-2.159.998 0 1.818.93 1.818 2.151 0 1.25-.827 2.233-1.819 2.233zm-8.264.186c-.806 0-1.49-.803-1.49-1.816 0-.967.677-1.756 1.49-1.756.827 0 1.497.774 1.497 1.749 0 1.02-.684 1.823-1.497 1.823zM1.54 17h5.54c-.392-.238-.656-.782-.606-1.273H1.476c-.136 0-.193-.067-.193-.193 0-1.705 1.911-3.327 4.172-3.327.798 0 1.597.208 2.21.566.242-.365.542-.678.934-.946-.906-.58-2.032-.893-3.144-.893C2.438 10.934 0 13.182 0 15.653 0 16.546.513 17 1.54 17zm7.743 0h8.885C19.4 17 20 16.59 20 15.712c0-2.046-2.453-4.77-6.274-4.77-3.822 0-6.275 2.724-6.275 4.77 0 .879.599 1.288 1.832 1.288zm-.228-1.303c-.164 0-.228-.059-.228-.193 0-1.139 1.761-3.26 4.899-3.26 3.137 0 4.898 2.121 4.898 3.26 0 .134-.064.194-.235.194H9.055z"></path>
                        </svg>
                      ),
                    },
                  ]}
                />
              </Popup> */}
              </div>
            </>
          )}
          <label htmlFor="add_doc" className={styles.new_content}>
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
              onChange={handlefileuploading}
              type="file"
              id="add_doc"
            />
            <span>Add new document</span>
          </label>
        </div>
      </header>
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
                  class="bi bi-people-fill"
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
              callback: "",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgba(55, 53, 47, 0.85)"
                  class="bi bi-calendar-check"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                  <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
              ),
            },
            {
              name: "By updated date",
              callback: "",
              svg: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="rgba(55, 53, 47, 0.85)"
                  class="bi bi-calendar-plus"
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
    </>
  );
}
