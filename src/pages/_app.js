import "@/styles/globals.css";
import "@/styles/popupmodel.css";
import { Cagliostro } from "next/font/google";
import { useEffect, useContext } from "react";
import { Gcommonprovider } from "@/context/common_global";
import { parse } from "cookie";

export default function App({ Component, pageProps }) {
  // const { user, setuser } = context;

  useEffect(() => {
    // Checking for user valid or unvalid with help token
    const cookies = parse(document.cookie);

    if (!cookies.documentiatoken && !cookies.documentiauser) {
      window.location.href = "https://documentia.ai/signin";
    }

    // Call the function to check cookies and navigate
    document.addEventListener("mousedown", (e) => {
      // Listening for overlay group heirarchy events for opening file structure under folder
      let check_for_group = e.target.closest("[data-role-group]");
      if (check_for_group) {
        check_for_group.nextElementSibling.classList.toggle(
          "folder_childswrapper_ative"
        );
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
    // });
  });
  return (
    <Gcommonprovider>
      <Component {...pageProps} />;
    </Gcommonprovider>
  );
}
