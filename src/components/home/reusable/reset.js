import styles from "../../../styles/reusable/reset.module.css";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
import Button from "./button";

function Reset({ currfile }) {
  const context = useContext(Rhscontext);

  const { setSavedMessages, del_chats_local } = context;

  function handledmove() {
    setSavedMessages([]);
    document.querySelectorAll("[data-g-navbar-flyer]").forEach((ele) => {
      ele.classList.remove("popup_container_active");
    });
    document.querySelector("#overlay").classList.remove("active_overlay");
    del_chats_local(currfile);
  }

  return (
    <>
      <div className={styles.reste_container}>
        <div className={styles.sub_reset_container}>
          <div className={styles.reset_headline}>Reset Conversation</div>
          <div className={styles.text_line}>
            <p>
              Are you sure you want to reset the conversation
              <br />
              All messages will be lost. This action is not reversible
            </p>
          </div>
          <Button disable={false} callback={handledmove} title="Reset" />
        </div>
      </div>
    </>
  );
}

export default Reset;
