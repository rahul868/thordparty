import "@/styles/globals.css";
import "@/styles/popupmodel.css";
import { useEffect } from "react";
import Head from "next/head";

/*
  App component include raw javascript which will used in application runtime event tracking 
  for some parts of application.
  ex. For Flyer opening , for LHS bar closing and opening etc.
*/

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Because this useEffect will execute after all chindrens component useEffect execution.
    // So that we will load this javascript after ENTIRE DOM loading and rendering.
    document.addEventListener("mousedown", (e) => {
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
    });
  }, []);

  return (
    <>
      <Head>
        <title>Documentia</title>
        <meta name="description" content="DOCUMENTIA AI MODEL INTERACTION" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <link rel="icon" href="assets/images/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
