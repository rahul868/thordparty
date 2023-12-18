import "@/styles/globals.css";
import "@/styles/popupmodel.css";
import { useEffect } from "react";
import { Gcommonprovider } from "@/context/common_global";
import Head from "next/head";
import { parse } from "cookie";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Checking for user valid or unvalid with help token
    // const cookies = parse(document.cookie);

    // if (!cookies.documentiatoken && !cookies.documentiauser) {
    //   window.location.href = "https://documentia.ai/signin";
    // }

    // Call the function to check cookies and navigate
    document.addEventListener("mousedown", (e) => {
      // checking for flyer
      e.preventDefault();
      let nav_tab_element = "[data-g_nav_header_tab]";
      let check_for_navtab_ele = e.target.closest(nav_tab_element);
      if (
        !check_for_navtab_ele &&
        e.target.closest("[g-nav-container]") != null
      ) {
        console.log("insied trhis");
        // Means Inside g-nav-container but not on nav_tab_element
        return;
      }

      if (check_for_navtab_ele) {
        let flyer = document.querySelector("[data-g-navbar-flyer]");
        console.log("fly", flyer);
        // document.querySelectorAll("[g-navbar-flyer]").forEach((ele) => {
        //   ele.classList.remove("nav_flyer_active");
        // });
        if (flyer) {
          flyer.classList.add("nav_flyer_active");
        }
        // Means If on nav_tab_element

        //document.querySelector("[activate-navbar-flyer=true]").classList.add("nav_flyer_active")
        return;
      }

      let is_flyer_close_trigger = e.target.closest(
        "[data-inner-content-flyer]"
      );
      if (is_flyer_close_trigger) {
        document
          .querySelector("[data-g-navbar-flyer]")
          .classList.remove("nav_flyer_active");
      }

      // Listening for is need to collapse LHS
      let check_for_lhscollapseunit = e.target.closest("[data-lhs-collapse]");
      if (check_for_lhscollapseunit) {
        document
          .querySelector("[data-sec-lhswrapper]")
          .classList.add("lhs_collapse");

        document
          .querySelector("[data-lhs-reopen]")
          .classList.add("lhsreopensvg_active");

        document.querySelector("[data-hamburgure]").style.display = "block";
        document.querySelector("[data-filepage]").style.display = "none";
        // document.querySelector("[data-close-hide]").style.display = "none";
      }

      // Listening for is need to reopen LHS
      let check_for_lhsreopenunit = e.target.closest("[data-lhs-reopen]");
      if (check_for_lhsreopenunit) {
        console.log("open");
        document
          .querySelector("[data-sec-lhswrapper]")
          .classList.remove("lhs_collapse");
        document
          .querySelector("[data-lhs-reopen]")
          .classList.remove("lhsreopensvg_active");
        document.querySelector("[data-hamburgure]").style.display = "none";
        document.querySelector("[data-filepage]").style.display = "block";
        // document.querySelector("[data-close-hide]").style.display = "flex";
      }

      // Shorcuts keys for application
    });

    document.addEventListener("mouseover", async (e) => {
      let nav_tab_element = "[data-g-chatsec]";
      let check_for_navtab_ele = e.target.matches(nav_tab_element);
      if (
        !check_for_navtab_ele &&
        e.target.closest("[data-g-nav-container]") != null
      ) {
        // Means Inside g-nav-container but not on nav_tab_element
        return;
      }
      if (check_for_navtab_ele) {
        if (e.target.previousSibling) {
          e.target.previousSibling.classList.add("option_flyer_wrapper_active");
          return;
        }
      }

      // Means Outside g-nav-container but not on nav_tab_element
      document.querySelectorAll("[data-g-opt-flyer]").forEach((ele) => {
        ele.classList.remove("option_flyer_wrapper_active");
      });
    });

    let n_key = false;
    document.addEventListener("keydown", function (event) {
      if (event.key === "n") {
        n_key = true;
      }
      // Check if the 'd' key is pressed and 'n' was pressed before
      if (event.key === "d" && n_key) {
        // Open document uploading widget
        document.querySelector("[data-newchat-widget]").click();
        // Prevent the default browser behavior (e.g., prevent typing in an input field)
        event.preventDefault();
        // Reset the flag after processing the combination
        n_key = false;
      }
    });

    // flyer component js
  });
  return (
    <Gcommonprovider>
      <Head>
        <title>Documentia</title>
        <meta name="description" content="DOCUMENTIA AI MODEL INTERACTION" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0"
        />
        <link rel="icon" href="/assets/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        /> */}
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <style>
          @import
          url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
        </style>
      </Head>
      <Component {...pageProps} />;
    </Gcommonprovider>
  );
}
