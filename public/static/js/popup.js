window.addEventListener("DOMContentLoaded", () => {
  // get mousedown
  document.addEventListener("mouseover", (e) => {
    let nav_tab_element = "[g_nav_header_tab]";
    let check_for_navtab_ele = e.target.matches(nav_tab_element);
    if (
      !check_for_navtab_ele &&
      e.target.closest("[g-nav-container]") != null
    ) {
      // Means Inside g-nav-container but not on nav_tab_element
      return;
    }
    if (check_for_navtab_ele) {
      if (e.target.nextElementSibling) {
        document.querySelectorAll("[g-navbar-flyer]").forEach((ele) => {
          ele.classList.remove("popup_container_active");
        });
        e.target.nextElementSibling.classList.add("popup_container_active");
        // Means If on nav_tab_element
        document
          .querySelector("[g-overlay]")
          .classList.add("active_overlay");
        //document.querySelector("[activate-navbar-flyer=true]").classList.add("nav_flyer_active")
        return;
      }
    }

    // Means Outside g-nav-container but not on nav_tab_element
    document.querySelectorAll("[g-navbar-flyer]").forEach((ele) => {
      ele.classList.remove("popup_container_active");
    });
    document
      .querySelector("[g-overlay]")
      .classList.remove("active_overlay");
  });
});
