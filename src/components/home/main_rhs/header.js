import styles from "@/styles/home/rhs/header.module.css";
import { useContext, useEffect, useState } from "react";
import Popup from "../reusable/popup";
import Rnewchat from "@/components/newchat/newchatwidget";
import Reset from "../reusable/reset";
import { Gcommoncontext } from "@/context/common_global";
import { Rhscontext } from "@/context/provider";
import Popuplist from "../reusable/popuplist";
import Setting from "../setting";
import Feedback from "../reusable/feedback";
import Gpopup from "../reusable/gpopup";
import Gpopupheader from "../reusable/gpopupheader";
import Indicator from "../reusable/indicator";

export default function Rheader() {
  const { currdoc, limit_string } = useContext(Gcommoncontext);
  const { save_chats_local } = useContext(Rhscontext);

  const [isMenu, setisMenu] = useState(false);

  const [isnewchat, setisnewchat] = useState(false);
  const [issave, setissave] = useState(false);
  const [isreset, setisreset] = useState(false);
  const [issetting, setissetting] = useState(false);
  const [isfeedback, setisfeedback] = useState(false);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 800) {
        setisMenu(true);
      } else {
        setisMenu(false);
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const ShowLeftSlider = () => {
    let showleft = document.getElementById("lhs_wrapper");
    showleft.classList.add(styles.show_left);
  };

  useEffect(() => {
    document.addEventListener("click", handleOutside);

    let showelement = document.getElementById("lhs_wrapper");
    let options_element = document.getElementById("file_menu");

    function handleOutside(e) {
      console.log(options_element);
      if (
        !showelement.contains(e.target) &&
        !options_element?.contains(e.target)
      ) {
        showelement.classList.remove(styles.show_left);
      }
    }

    return () => {
      document.removeEventListener("click", handleOutside);
    };
  }, []);

  function handleshowdrop() {
    let dropelement = document.getElementById("headers_options");
    if (dropelement.style.display == "block") {
      dropelement.style.display = "none";
    } else {
      dropelement.style.display = "block";
    }
  }

  function save_call() {
    setissave(true);
    save_chats_local(currdoc.name);
    setTimeout(() => {
      setissave(false);
    }, 5000);
  }

  useEffect(() => {
    document.addEventListener("click", handleoutside);

    function handleoutside(e) {
      let showelement = document.getElementsByClassName(
        styles.show_header_drop_options
      )[0];
      let connectButton = document.getElementsByClassName("include")[0];

      // Check if the click happened outside the "right_slide_container" and not on the "puzzle_connect" or its children
      if (
        !showelement.contains(e.target) &&
        !connectButton?.contains(e.target)
      ) {
        // showelement.classList.remove("active_slide");
        // document.getElementById("right_full_back").style.display = "none";
        showelement.style.display = "none";
      }

      e.stopPropagation();
    }

    return () => {
      document.removeEventListener("click", handleoutside);
    };
  }, []);

  function handleClose(action) {
    switch (action) {
      case "newchat":
        setisnewchat(false);
        break;
      case "reset":
        setisreset(false);
        break;
      case "setting":
        setissetting(false);
        break;
      case "feedback":
        setisfeedback(false);
        break;
      // Add more cases if needed
      default:
      // Handle default case if necessary
    }
  }

  return (
    <header id="main_rhs_header" className={styles.rhs_header_wrapper}>
      <div className={styles.rhs_header_content}>
        <div className={styles.document_intro}>
          <div
            data-lhs-reopen
            id="file_menu"
            className={`${styles.document_intro_svg} ${styles.lhsrepoen}`}
            onClick={isMenu ? ShowLeftSlider : ""}
          >
            {isMenu ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-list"
                viewBox="0 0 16 16"
                style={{
                  cursor: "pointer",
                  verticalAlign: "middle",
                }}
              >
                <path
                  fill-rule="evenodd"
                  d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
                />
              </svg>
            ) : (
              <svg
                role="graphics-symbol"
                viewBox="0 0 16 16"
                class="page"
                style={{
                  width: 18,
                  height: 18,
                  display: "block",
                  fill: "rgba(55, 53, 47, 0.45)",
                  flexShrink: 0,
                }}
              >
                <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
              </svg>
            )}
          </div>
          <div style={{ paddingLeft: 10,lineHeight:1.2 }}>
            <h4>{limit_string(currdoc.name, 24)}</h4>
            <span>
              Last edited {new Date(parseInt(currdoc.lastedit)).toDateString()}
            </span>
          </div>
        </div>
        <div
          id="_g_header_navbar_wrapper"
          g_nav_header_tab
          className={styles.g_header_navbar_wrapper}
        >
          <div onClick={() => save_call()} className={styles.dropdown_block}>
            <span>
              <svg
                fill="rgba(55, 53, 47, 0.85)"
                className="import"
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
                <path d="M13.291 14.572c0-.424-.3-.738-.718-.738H8.068a.8.8 0 00.493-.24l4.498-4.511a.758.758 0 00.232-.54c0-.417-.3-.725-.71-.725a.743.743 0 00-.534.22l-1.552 1.53-1.805 2.017.062-1.477V1.611c0-.45-.308-.758-.752-.758-.438 0-.745.307-.745.758v8.497l.055 1.47-1.805-2.01-1.552-1.53a.727.727 0 00-.526-.22.703.703 0 00-.718.725c0 .198.075.376.232.54l4.505 4.512a.783.783 0 00.492.239H3.44a.713.713 0 00-.731.738c0 .417.308.732.731.732h9.133c.417 0 .718-.315.718-.732z"></path>
              </svg>
            </span>
            <span
              id="news_nav_tab"
              g_nav_header_tab
              className={styles.dropdown_block_heading}
            >
              Save
            </span>
            <Indicator
              isOpen={issave}
              type={"s"}
              msg={"Chats saved successfully."}
            />
          </div>
          <div>
            <div
              className={styles.dropdown_block}
              onClick={() => setisreset(true)}
            >
              <span>
                <svg
                  fill="rgba(55, 53, 47, 0.85)"
                  className="showDeletedPages"
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
                  <path d="M1.896 8.55c0 3.39 2.72 6.118 6.104 6.118a6.096 6.096 0 006.104-6.118 6.06 6.06 0 00-6.083-6.091c-.356 0-.705.034-1.005.096L8.67.92a.658.658 0 00.184-.458c0-.37-.287-.67-.649-.67a.614.614 0 00-.472.198l-2.802 2.85a.674.674 0 000 .984l2.802 2.831a.618.618 0 00.472.185c.362 0 .65-.287.65-.663a.631.631 0 00-.192-.451L6.803 3.88c.35-.075.766-.11 1.218-.11 2.645 0 4.744 2.113 4.744 4.779A4.754 4.754 0 018 13.328 4.754 4.754 0 013.235 8.55c0-.404-.26-.69-.656-.69-.403 0-.683.286-.683.69z"></path>
                </svg>
              </span>
              <span
                id="news_nav_tab"
                g_nav_header_tab
                className={styles.dropdown_block_heading}
              >
                Reset
              </span>
            </div>
          </div>

          <div>
            <div
              className={`${styles.dropdown_block} ${styles.tabbreaker}`}
              onClick={() => setissetting(true)}
            >
              <span>
                <svg
                  fill="rgba(55, 53, 47, 0.85)"
                  className="sidebarSettings"
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
                    d="M10 11.15a1.15 1.15 0 100-2.3 1.15 1.15 0 000 2.3zm0 1.2a2.35 2.35 0 100-4.7 2.35 2.35 0 000 4.7z"
                    clipRule="evenodd"
                  ></path>
                  <path
                    fillRule="evenodd"
                    d="M8.663 13.92l.63 1.874a.1.1 0 00.095.068h1.224a.1.1 0 00.095-.068l.63-1.874.512-.26a4.1 4.1 0 00.394-.228l.481-.315 1.94.392a.1.1 0 00.107-.048l.612-1.06a.1.1 0 00-.012-.116l-1.309-1.484.032-.572a4.221 4.221 0 000-.458l-.031-.572 1.308-1.484a.1.1 0 00.012-.116l-.612-1.06a.1.1 0 00-.106-.048l-1.94.392-.482-.316a4.098 4.098 0 00-.394-.228l-.512-.259-.63-1.874a.1.1 0 00-.095-.068H9.388a.1.1 0 00-.095.068l-.63 1.874-.512.26a4.094 4.094 0 00-.394.227l-.481.316-1.94-.392a.1.1 0 00-.107.048l-.612 1.06a.1.1 0 00.012.116l1.309 1.484-.032.572a4.184 4.184 0 000 .458l.032.572-1.31 1.484a.1.1 0 00-.01.116l.61 1.06a.1.1 0 00.107.048l1.94-.392.482.315c.127.084.258.16.394.229l.512.259zm-1.674.683c.17.112.347.214.53.307l.447 1.33a1.5 1.5 0 001.422 1.022h1.224a1.5 1.5 0 001.422-1.021l.447-1.331c.183-.093.36-.195.53-.307l1.377.278a1.5 1.5 0 001.595-.72l.612-1.06a1.5 1.5 0 00-.174-1.742l-.93-1.054a5.616 5.616 0 000-.61l.93-1.054a1.5 1.5 0 00.174-1.742l-.611-1.06a1.5 1.5 0 00-1.596-.72l-1.377.277a5.507 5.507 0 00-.53-.306l-.447-1.33a1.5 1.5 0 00-1.422-1.022H9.388a1.5 1.5 0 00-1.422 1.021L7.52 5.09c-.183.093-.36.195-.53.306l-1.377-.278a1.5 1.5 0 00-1.596.72l-.611 1.06a1.5 1.5 0 00.174 1.743l.93 1.054a5.586 5.586 0 000 .61l-.93 1.054a1.5 1.5 0 00-.174 1.742l.611 1.06a1.5 1.5 0 001.596.72l1.377-.278z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </span>
              <span id="news_nav_tab" className={styles.dropdown_block_heading}>
                Settings
              </span>
            </div>
          </div>
          <a target="_blank" href="https://www.documentia.ai/about">
            <div className={styles.dropdown_block}>
              <span>
                <svg
                  fill="rgba(55, 53, 47, 0.85)"
                  className="help"
                  display="block"
                  viewBox="0 0 16 16"
                  style={{
                    width: 14,
                    height: 14,
                    WebkitFlexShrink: "0",
                    MsFlexShrink: "0",
                    flexShrink: "0",
                    marginRight: 6,
                  }}
                >
                  <path d="M8 15.126c3.862 0 7.062-3.192 7.062-7.062 0-3.862-3.2-7.061-7.069-7.061-3.862 0-7.055 3.2-7.055 7.061 0 3.87 3.2 7.062 7.062 7.062zm0-1.388a5.654 5.654 0 01-5.667-5.674 5.642 5.642 0 015.66-5.667 5.664 5.664 0 015.68 5.667A5.66 5.66 0 018 13.738zm-.157-4.313c.376 0 .615-.212.636-.492V8.85c.02-.356.266-.595.71-.882.67-.445 1.108-.834 1.108-1.627 0-1.142-1.026-1.791-2.235-1.791-1.17 0-1.97.533-2.181 1.176a1.051 1.051 0 00-.062.355c0 .328.26.533.534.533a.637.637 0 00.553-.287l.11-.137c.225-.376.553-.574.963-.574.554 0 .93.328.93.793 0 .43-.287.643-.868 1.046-.485.335-.84.69-.84 1.313v.075c0 .383.232.58.642.58zm-.007 2.098c.437 0 .8-.32.8-.752 0-.43-.363-.745-.8-.745-.444 0-.8.322-.8.745 0 .431.362.752.8.752z"></path>
                </svg>
              </span>

              <span
                id="news_nav_tab"
                g_nav_header_tab
                className={styles.dropdown_block_heading}
              >
                About us
              </span>
            </div>
          </a>
          <div>
            <div
              className={styles.dropdown_block}
              onClick={() => setisfeedback(true)}
            >
              <span>
                <svg
                  fill="rgba(55, 53, 47, 0.85)"
                  className="settingsIntegration"
                  display="block"
                  viewBox="0 0 20 20"
                  style={{
                    width: 18,
                    height: 18,
                    WebkitFlexShrink: "0",
                    MsFlexShrink: "0",
                    flexShrink: "0",
                  }}
                >
                  <path d="M4.633 9.42h3.154c1.093 0 1.632-.532 1.632-1.656V4.655C9.42 3.532 8.88 3 7.787 3H4.633C3.532 3 3 3.532 3 4.655v3.109c0 1.124.532 1.655 1.633 1.655zm7.58 0h3.162C16.468 9.42 17 8.887 17 7.763V4.655C17 3.532 16.468 3 15.374 3h-3.16c-1.094 0-1.633.532-1.633 1.655v3.109c0 1.124.539 1.655 1.633 1.655zm-7.58-1.251c-.262 0-.382-.135-.382-.405V4.648c0-.27.12-.405.382-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405H4.633zm7.588 0c-.262 0-.39-.135-.39-.405V4.648c0-.27.128-.405.39-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405h-3.146zM4.633 17h3.154c1.093 0 1.632-.532 1.632-1.655v-3.109c0-1.124-.539-1.655-1.632-1.655H4.633C3.532 10.58 3 11.112 3 12.236v3.109C3 16.468 3.532 17 4.633 17zm7.58 0h3.162C16.468 17 17 16.468 17 15.345v-3.109c0-1.124-.532-1.655-1.626-1.655h-3.16c-1.094 0-1.633.531-1.633 1.655v3.109c0 1.123.539 1.655 1.633 1.655zm-7.58-1.25c-.262 0-.382-.128-.382-.398v-3.116c0-.277.12-.405.382-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397H4.633zm7.588 0c-.262 0-.39-.128-.39-.398v-3.116c0-.277.128-.405.39-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397h-3.146z"></path>
                </svg>
              </span>
              <span
                id="news_nav_tab"
                g_nav_header_tab
                className={styles.dropdown_block_heading}
              >
                Feedback
              </span>
            </div>
          </div>
        </div>

        {/* Third section */}

        <div className={styles.t_section}>
          <div
            data-newchat-widget
            className={`${styles.spaecialtab} ${styles.dropdown_block}`}
            onClick={() => setisnewchat(true)}
          >
            <span>
              <svg
                fill="white"
                className="file"
                display="block"
                viewBox="0 0 16 16"
                style={{
                  width: 18,
                  height: 18,
                  WebkitFlexShrink: "0",
                  MsFlexShrink: "0",
                  flexShrink: "0",
                  marginRight: 5,
                }}
              >
                <path d="M4.356 15.468h7.28c1.464 0 2.222-.773 2.222-2.242v-6.2c0-.95-.123-1.388-.717-1.99l-3.59-3.65C8.979.805 8.507.668 7.652.668H4.356c-1.462 0-2.221.772-2.221 2.242v10.316c0 1.476.759 2.242 2.221 2.242zm.11-1.34c-.663 0-.991-.349-.991-.984V2.992c0-.629.328-.984.99-.984h2.913v3.746c0 .977.485 1.45 1.456 1.45h3.685v5.94c0 .635-.335.984-.998.984H4.466zm4.491-8.1c-.28 0-.396-.124-.396-.404V2.192l3.773 3.835H8.957zm-.362 6.699v-2.1L8.54 9.563l.526.553.527.533a.531.531 0 00.396.185c.308 0 .54-.219.54-.526a.49.49 0 00-.191-.404L8.45 8.167c-.157-.144-.287-.205-.458-.205-.164 0-.294.061-.451.205L5.655 9.903a.49.49 0 00-.191.404c0 .307.225.526.54.526a.543.543 0 00.396-.185l.527-.533.526-.553-.055 1.066v2.099c0 .328.274.574.595.574.328 0 .602-.246.602-.574z"></path>
              </svg>
            </span>
            <span id="news_nav_tab" className={styles.dropdown_block_heading}>
              New chat
            </span>
          </div>
        </div>

        <div className={styles.includes_options_to_show}>
          <div className="include">
            <span onClick={handleshowdrop}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-three-dots"
                viewBox="0 0 16 16"
              >
                <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
              </svg>
            </span>
          </div>
          <div id="headers_options" className={styles.show_header_drop_options}>
            <div className={styles.show_sub_header_drop}>
              <div
                id="_g_header_navbar_wrapper"
                g_nav_header_tab
                className={styles.g_header_navbar_wrapper}
                style={{ display: "block" }}
              >
                <div
                  onClick={() => save_chats_local(currdoc.name)}
                  className={styles.dropdown_block}
                >
                  <span>
                    <svg
                      fill="rgba(55, 53, 47, 0.85)"
                      className="import"
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
                      <path d="M13.291 14.572c0-.424-.3-.738-.718-.738H8.068a.8.8 0 00.493-.24l4.498-4.511a.758.758 0 00.232-.54c0-.417-.3-.725-.71-.725a.743.743 0 00-.534.22l-1.552 1.53-1.805 2.017.062-1.477V1.611c0-.45-.308-.758-.752-.758-.438 0-.745.307-.745.758v8.497l.055 1.47-1.805-2.01-1.552-1.53a.727.727 0 00-.526-.22.703.703 0 00-.718.725c0 .198.075.376.232.54l4.505 4.512a.783.783 0 00.492.239H3.44a.713.713 0 00-.731.738c0 .417.308.732.731.732h9.133c.417 0 .718-.315.718-.732z"></path>
                    </svg>
                  </span>
                  <span
                    id="news_nav_tab"
                    g_nav_header_tab
                    className={styles.dropdown_block_heading}
                  >
                    Save
                  </span>
                </div>
                <div>
                  <div
                    className={styles.dropdown_block}
                    onClick={() => setisreset(true)}
                  >
                    <span>
                      <svg
                        fill="rgba(55, 53, 47, 0.85)"
                        className="showDeletedPages"
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
                        <path d="M1.896 8.55c0 3.39 2.72 6.118 6.104 6.118a6.096 6.096 0 006.104-6.118 6.06 6.06 0 00-6.083-6.091c-.356 0-.705.034-1.005.096L8.67.92a.658.658 0 00.184-.458c0-.37-.287-.67-.649-.67a.614.614 0 00-.472.198l-2.802 2.85a.674.674 0 000 .984l2.802 2.831a.618.618 0 00.472.185c.362 0 .65-.287.65-.663a.631.631 0 00-.192-.451L6.803 3.88c.35-.075.766-.11 1.218-.11 2.645 0 4.744 2.113 4.744 4.779A4.754 4.754 0 018 13.328 4.754 4.754 0 013.235 8.55c0-.404-.26-.69-.656-.69-.403 0-.683.286-.683.69z"></path>
                      </svg>
                    </span>
                    <span
                      id="news_nav_tab"
                      g_nav_header_tab
                      className={styles.dropdown_block_heading}
                    >
                      Reset
                    </span>
                  </div>
                </div>

                <div>
                  <div
                    className={`${styles.dropdown_block} ${styles.tabbreaker}`}
                    onClick={() => setissetting(true)}
                  >
                    <span>
                      <svg
                        fill="rgba(55, 53, 47, 0.85)"
                        className="sidebarSettings"
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
                          d="M10 11.15a1.15 1.15 0 100-2.3 1.15 1.15 0 000 2.3zm0 1.2a2.35 2.35 0 100-4.7 2.35 2.35 0 000 4.7z"
                          clipRule="evenodd"
                        ></path>
                        <path
                          fillRule="evenodd"
                          d="M8.663 13.92l.63 1.874a.1.1 0 00.095.068h1.224a.1.1 0 00.095-.068l.63-1.874.512-.26a4.1 4.1 0 00.394-.228l.481-.315 1.94.392a.1.1 0 00.107-.048l.612-1.06a.1.1 0 00-.012-.116l-1.309-1.484.032-.572a4.221 4.221 0 000-.458l-.031-.572 1.308-1.484a.1.1 0 00.012-.116l-.612-1.06a.1.1 0 00-.106-.048l-1.94.392-.482-.316a4.098 4.098 0 00-.394-.228l-.512-.259-.63-1.874a.1.1 0 00-.095-.068H9.388a.1.1 0 00-.095.068l-.63 1.874-.512.26a4.094 4.094 0 00-.394.227l-.481.316-1.94-.392a.1.1 0 00-.107.048l-.612 1.06a.1.1 0 00.012.116l1.309 1.484-.032.572a4.184 4.184 0 000 .458l.032.572-1.31 1.484a.1.1 0 00-.01.116l.61 1.06a.1.1 0 00.107.048l1.94-.392.482.315c.127.084.258.16.394.229l.512.259zm-1.674.683c.17.112.347.214.53.307l.447 1.33a1.5 1.5 0 001.422 1.022h1.224a1.5 1.5 0 001.422-1.021l.447-1.331c.183-.093.36-.195.53-.307l1.377.278a1.5 1.5 0 001.595-.72l.612-1.06a1.5 1.5 0 00-.174-1.742l-.93-1.054a5.616 5.616 0 000-.61l.93-1.054a1.5 1.5 0 00.174-1.742l-.611-1.06a1.5 1.5 0 00-1.596-.72l-1.377.277a5.507 5.507 0 00-.53-.306l-.447-1.33a1.5 1.5 0 00-1.422-1.022H9.388a1.5 1.5 0 00-1.422 1.021L7.52 5.09c-.183.093-.36.195-.53.306l-1.377-.278a1.5 1.5 0 00-1.596.72l-.611 1.06a1.5 1.5 0 00.174 1.743l.93 1.054a5.586 5.586 0 000 .61l-.93 1.054a1.5 1.5 0 00-.174 1.742l.611 1.06a1.5 1.5 0 001.596.72l1.377-.278z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </span>
                    <span
                      id="news_nav_tab"
                      className={styles.dropdown_block_heading}
                    >
                      Settings
                    </span>
                  </div>
                </div>
                <a target="_blank" href="https://www.documentia.ai/about">
                  <div className={styles.dropdown_block}>
                    <span>
                      <svg
                        fill="rgba(55, 53, 47, 0.85)"
                        className="help"
                        display="block"
                        viewBox="0 0 16 16"
                        style={{
                          width: 14,
                          height: 14,
                          WebkitFlexShrink: "0",
                          MsFlexShrink: "0",
                          flexShrink: "0",
                          marginRight: 6,
                        }}
                      >
                        <path d="M8 15.126c3.862 0 7.062-3.192 7.062-7.062 0-3.862-3.2-7.061-7.069-7.061-3.862 0-7.055 3.2-7.055 7.061 0 3.87 3.2 7.062 7.062 7.062zm0-1.388a5.654 5.654 0 01-5.667-5.674 5.642 5.642 0 015.66-5.667 5.664 5.664 0 015.68 5.667A5.66 5.66 0 018 13.738zm-.157-4.313c.376 0 .615-.212.636-.492V8.85c.02-.356.266-.595.71-.882.67-.445 1.108-.834 1.108-1.627 0-1.142-1.026-1.791-2.235-1.791-1.17 0-1.97.533-2.181 1.176a1.051 1.051 0 00-.062.355c0 .328.26.533.534.533a.637.637 0 00.553-.287l.11-.137c.225-.376.553-.574.963-.574.554 0 .93.328.93.793 0 .43-.287.643-.868 1.046-.485.335-.84.69-.84 1.313v.075c0 .383.232.58.642.58zm-.007 2.098c.437 0 .8-.32.8-.752 0-.43-.363-.745-.8-.745-.444 0-.8.322-.8.745 0 .431.362.752.8.752z"></path>
                      </svg>
                    </span>

                    <span
                      id="news_nav_tab"
                      g_nav_header_tab
                      className={styles.dropdown_block_heading}
                    >
                      About us
                    </span>
                  </div>
                </a>
                <div>
                  <div
                    className={styles.dropdown_block}
                    onClick={() => setisfeedback(true)}
                  >
                    <span>
                      <svg
                        fill="rgba(55, 53, 47, 0.85)"
                        className="settingsIntegration"
                        display="block"
                        viewBox="0 0 20 20"
                        style={{
                          width: 18,
                          height: 18,
                          WebkitFlexShrink: "0",
                          MsFlexShrink: "0",
                          flexShrink: "0",
                        }}
                      >
                        <path d="M4.633 9.42h3.154c1.093 0 1.632-.532 1.632-1.656V4.655C9.42 3.532 8.88 3 7.787 3H4.633C3.532 3 3 3.532 3 4.655v3.109c0 1.124.532 1.655 1.633 1.655zm7.58 0h3.162C16.468 9.42 17 8.887 17 7.763V4.655C17 3.532 16.468 3 15.374 3h-3.16c-1.094 0-1.633.532-1.633 1.655v3.109c0 1.124.539 1.655 1.633 1.655zm-7.58-1.251c-.262 0-.382-.135-.382-.405V4.648c0-.27.12-.405.382-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405H4.633zm7.588 0c-.262 0-.39-.135-.39-.405V4.648c0-.27.128-.405.39-.405h3.146c.262 0 .39.135.39.405v3.116c0 .27-.128.405-.39.405h-3.146zM4.633 17h3.154c1.093 0 1.632-.532 1.632-1.655v-3.109c0-1.124-.539-1.655-1.632-1.655H4.633C3.532 10.58 3 11.112 3 12.236v3.109C3 16.468 3.532 17 4.633 17zm7.58 0h3.162C16.468 17 17 16.468 17 15.345v-3.109c0-1.124-.532-1.655-1.626-1.655h-3.16c-1.094 0-1.633.531-1.633 1.655v3.109c0 1.123.539 1.655 1.633 1.655zm-7.58-1.25c-.262 0-.382-.128-.382-.398v-3.116c0-.277.12-.405.382-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397H4.633zm7.588 0c-.262 0-.39-.128-.39-.398v-3.116c0-.277.128-.405.39-.405h3.146c.262 0 .39.128.39.405v3.116c0 .27-.128.397-.39.397h-3.146z"></path>
                      </svg>
                    </span>
                    <span
                      id="news_nav_tab"
                      g_nav_header_tab
                      className={styles.dropdown_block_heading}
                    >
                      Feedback
                    </span>
                  </div>
                </div>
              </div>
              <div className={styles.t_section} style={{ display: "block" }}>
                <div
                  className={`${styles.spaecialtab} ${styles.dropdown_block}`}
                  onClick={() => setisnewchat(true)}
                >
                  <span>
                    <svg
                      fill="white"
                      className="file"
                      display="block"
                      viewBox="0 0 16 16"
                      style={{
                        width: 18,
                        height: 18,
                        WebkitFlexShrink: "0",
                        MsFlexShrink: "0",
                        flexShrink: "0",
                        marginRight: 5,
                      }}
                    >
                      <path d="M4.356 15.468h7.28c1.464 0 2.222-.773 2.222-2.242v-6.2c0-.95-.123-1.388-.717-1.99l-3.59-3.65C8.979.805 8.507.668 7.652.668H4.356c-1.462 0-2.221.772-2.221 2.242v10.316c0 1.476.759 2.242 2.221 2.242zm.11-1.34c-.663 0-.991-.349-.991-.984V2.992c0-.629.328-.984.99-.984h2.913v3.746c0 .977.485 1.45 1.456 1.45h3.685v5.94c0 .635-.335.984-.998.984H4.466zm4.491-8.1c-.28 0-.396-.124-.396-.404V2.192l3.773 3.835H8.957zm-.362 6.699v-2.1L8.54 9.563l.526.553.527.533a.531.531 0 00.396.185c.308 0 .54-.219.54-.526a.49.49 0 00-.191-.404L8.45 8.167c-.157-.144-.287-.205-.458-.205-.164 0-.294.061-.451.205L5.655 9.903a.49.49 0 00-.191.404c0 .307.225.526.54.526a.543.543 0 00.396-.185l.527-.533.526-.553-.055 1.066v2.099c0 .328.274.574.595.574.328 0 .602-.246.602-.574z"></path>
                    </svg>
                  </span>
                  <span
                    id="news_nav_tab"
                    className={styles.dropdown_block_heading}
                  >
                    New chat
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Gpopup
        id="doc-newchat"
        isOpen={isnewchat}
        onClose={() => handleClose("newchat")}
      >
        <>
          <Gpopupheader
            content={"Upload Files"}
            close={() => handleClose("newchat")}
          />
          <Rnewchat close={() => handleClose("newchat")} />
        </>
      </Gpopup>
      <Gpopup
        id="doc-reset"
        isOpen={isreset}
        onClose={() => handleClose("reset")}
      >
        <Gpopupheader
          content={"Reset Conversation"}
          close={() => handleClose("reset")}
          t_style={{ color: "brown" }}
        />
        <Reset close={() => handleClose("reset")} />
      </Gpopup>
      <Gpopup
        id="doc-setting"
        isOpen={issetting}
        onClose={() => handleClose("setting")}
      >
        <Gpopupheader
          content={"Chat Experience"}
          close={() => handleClose("setting")}
        />
        <Setting close={() => handleClose("setting")} />
      </Gpopup>
      <Gpopup
        id="doc-feedback"
        isOpen={isfeedback}
        onClose={() => handleClose("feedback")}
      >
        <Gpopupheader
          content={"Feedback"}
          close={() => handleClose("feedback")}
        />
        <Feedback close={() => handleClose("feedback")} />
      </Gpopup>
    </header>
  );
}
