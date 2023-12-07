import "@/styles/globals.css";
import "@/styles/popupmodel.css";
import { Cagliostro } from "next/font/google";
import { useEffect } from "react";
import { Gcommonprovider } from "@/context/common_global";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // window.addEventListener("DOMContentLoaded", () => {
    // listen mousedown event.
    document.addEventListener("mousedown", (e) => {
      let nav_tab_element = "[data-g-popup-tab]";
      let check_for_internal_ele = e.target.closest("[data-g-popup-tab]");
      let check_for_navtab_ele = e.target.matches(nav_tab_element);
      let check_for_parent = e.target.closest("[data-g-navbar-flyer]");
      if (
        !check_for_navtab_ele &&
        check_for_internal_ele == null &&
        check_for_parent != null
      ) {
        // Means Inside g-nav-container but not on nav_tab_element
        return;
      }
      if (check_for_navtab_ele || check_for_internal_ele) {
        if (check_for_internal_ele.nextElementSibling) {
          document.querySelectorAll("[data-g-navbar-flyer]").forEach((ele) => {
            ele.classList.remove("popup_container_active");
          });
          check_for_internal_ele.nextElementSibling.classList.add(
            "popup_container_active"
          );
          // Means If on nav_tab_element

          document.querySelector("#overlay").classList.add("active_overlay");
          //document.querySelector("[activate-navbar-flyer=true]").classList.add("nav_flyer_active")
          return;
        }
      }

      // Means Outside g-nav-container but not on nav_tab_element
      document.querySelectorAll("[data-g-navbar-flyer]").forEach((ele) => {
        ele.classList.remove("popup_container_active");
      });
      document.querySelector("#overlay").classList.remove("active_overlay");
    });

    document.addEventListener("mousedown", (e) => {
      let check_for_internal_ele = e.target.closest("[data-role-group]");
      if (check_for_internal_ele) {
        check_for_internal_ele.nextElementSibling.classList.toggle(
          "folder_childswrapper_ative"
        );
      }
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
  });
  return (
    <Gcommonprovider>
      <Component {...pageProps} />;
    </Gcommonprovider>
  );
}
