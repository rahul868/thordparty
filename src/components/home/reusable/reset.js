import styles from "../../../styles/reusable/reset.module.css";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
import Button from "./button";

function Reset({ close }) {
  const context = useContext(Rhscontext);

  const { setSavedMessages } = context;

  function handledmove() {
    setSavedMessages([]);
    close();
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
