import React, { useEffect } from "react";
import styles from "../../../styles/home/rhs/controller.module.css";

export default function Controller() {
  function handleshowviwer() {
    let docelement = document.getElementById("doc_wrapper");
    let chatelement = document.getElementById("chat_wrapper");

    function updateStyles() {
      if (window.innerWidth <= 650) {
        docelement.style.display = "block";
        chatelement.style.display = "none";
      } else {
        docelement.style.display = "block";
        chatelement.style.display = "block";
      }
    }

    // Initial styles
    updateStyles();

    // Event listener for window resize
    window.addEventListener("resize", updateStyles);
  }

  function handleshowchat() {
    let docelement = document.getElementById("doc_wrapper");
    let chatelement = document.getElementById("chat_wrapper");

    function updateStyles() {
      if (window.innerWidth <= 650) {
        docelement.style.display = "none";
        chatelement.style.display = "block";
      } else {
        // Handle styles for inner width less than 650px
        // You can modify this part based on your requirements
        docelement.style.display = "block";
        chatelement.style.display = "block";
      }
    }

    // Initial styles
    updateStyles();

    // Event listener for window resize
    window.addEventListener("resize", updateStyles);
  }

  function EnableHover() {
    let element = document.querySelectorAll(`.${styles.same}`);
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

    const chatElement = document.querySelector(`.${styles.same}:first-child`);
    if (chatElement) {
      chatElement.classList.add(styles.active_chat_or_view);
    }
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
