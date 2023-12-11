import React, { useEffect } from "react";
import styles from "../../../styles/home/rhs/controller.module.css";

export default function Controller() {
  function handleshowviwer() {
    let chatelement = document.getElementsByClassName(
      styles.wrapping_actual_chat_container
    )[0];
    let viewrelement = document.getElementsByClassName(
      styles.viwer_for_detail
    )[0];
    chatelement.style.display = "none";
    viewrelement.style.display = "block";
  }

  function handleshowchat() {
    let chatelement = document.getElementsByClassName(
      styles.wrapping_actual_chat_container
    )[0];
    let viewrelement = document.getElementsByClassName(
      styles.viwer_for_detail
    )[0];
    chatelement.style.display = "block";
    viewrelement.style.display = "none";
  }

  function EnableHover() {
    let element = document.querySelectorAll(`.${styles.same}`);

    console.log(element);

    element.forEach((item) => {
      item.addEventListener("click", function (e) {
        element.forEach((otherItem) => {
          otherItem.classList.remove(styles.active_chat_or_view);
        });

        item.classList.add(styles.active_chat_or_view);
        item.classList.add(styles.transition);

        setTimeout(() => {
          item.classList.remove(styles.transition);
        }, 500);
      });
    });
  }

  useEffect(() => {
    EnableHover();
  }, []);

  return (
    <>
      <div className={styles.control_section_for_chats_viewers}>
        <div className={styles.control_section_for_sub_wrapper}>
          <div className={styles.same} onClick={handleshowchat}>
            <span>CHAT</span>
          </div>
          <div className={styles.same} onClick={handleshowviwer}>
            <span>READER</span>
          </div>
        </div>
      </div>
    </>
  );
}
