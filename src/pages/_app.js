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
      // // checking for flyer

      // e.stopPropagation();

      let nav_tab_element = "[data-g_nav_header_tab]";
      let check_for_navtab_ele = e.target.closest(nav_tab_element);
      if (
        !check_for_navtab_ele &&
        e.target.closest("[g-nav-container]") != null
      ) {
        // Means Inside g-nav-container but not on nav_tab_element
        return;
      }

      if (check_for_navtab_ele) {
        let flyer = document.querySelector("[data-g-navbar-flyer]");

        if (flyer) {
          flyer.classList.add("nav_flyer_active");
        }
        // Means If on nav_tab_element

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

      // Listening for the need to collapse LHS
      let check_for_lhscollapseunit = e.target.closest("[data-lhs-collapse]");
      if (check_for_lhscollapseunit) {
        const lhswrapper = document.querySelector("[data-sec-lhswrapper]");
        if (window.innerWidth > 800) {
          lhswrapper.classList.add("lhs_collapse");
        }
        lhswrapper.classList.toggle("lhs_mob_active", false);
        document.querySelector("[data-lhs-reopen]").style.display = "block";

        const closeHideElement = document.querySelector("[data-close-hide]");
        if (closeHideElement) {
          closeHideElement.style.display = "none";
        }

        return;
      }

      // Listening for the need to reopen LHS
      let check_for_lhsreopenunit = e.target.closest("[data-lhs-reopen]");
      if (check_for_lhsreopenunit) {
        const lhswrapper = document.querySelector("[data-sec-lhswrapper]");
        lhswrapper.classList.remove("lhs_collapse");
        document.querySelector("[data-lhs-reopen]").style.display = "none";

        const closeHideElement = document.querySelector("[data-close-hide]");
        if (closeHideElement) {
          closeHideElement.style.display = "block";
        }

        return;
      }

      // Listening for the need to reopen LHS
      let check_for_mob_lhsreopenunit = e.target.closest(
        "[data-mob-lhs-reopen]"
      );
      if (check_for_mob_lhsreopenunit) {
        const lhswrapper = document.querySelector("[data-sec-lhswrapper]");
        lhswrapper.classList.toggle("lhs_mob_active");
        return;
      }

      // Folder open event
      // Listening for overlay group heirarchy events for opening file structure under folder
      let check_for_group = e.target.closest("[data-role-group]");
      if (check_for_group) {
        check_for_group.nextElementSibling.classList.toggle(
          "folder_childswrapper_ative"
        );
        return;
      }

      // Shorcuts keys for application
    });

    // document.addEventListener("mouseover", async (e) => {
    //   let nav_tab_element = "[data-g-chatsec]";
    //   let check_for_navtab_ele = e.target.matches(nav_tab_element);
    //   // Check if the event target is the background element

    //   if (
    //     !check_for_navtab_ele &&
    //     e.target.closest("[data-g-nav-container]") != null
    //   ) {
    //     // Means Inside g-nav-container but not on nav_tab_element
    //     return;
    //   }

    //   if (check_for_navtab_ele) {
    //     if (e.target.previousSibling) {
    //       e.target.previousSibling.classList.add("option_flyer_wrapper_active");
    //       return;
    //     }
    //   }

    //   // Means Outside g-nav-container or not on nav_tab_element or not on the background
    //   document.querySelectorAll("[data-g-opt-flyer]").forEach((ele) => {
    //     ele.classList.remove("option_flyer_wrapper_active");
    //   });
    // });

    let alt_key = false;

    document.addEventListener("keydown", function (event) {
      if (event.altKey) {
        alt_key = true;
      }
      // Check if the 'd' key is pressed and 'n' was pressed before
      if (event.key === "d" && alt_key) {
        // Open document uploading widget
        document.querySelector("[data-newchat-widget]").click();
        // Prevent the default browser behavior (e.g., prevent typing in an input field)
        event.preventDefault();
        // Reset the flag after processing the combination
        alt_key = false;
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
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="/assets/images/favicon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />
    </Gcommonprovider>
  );
}
