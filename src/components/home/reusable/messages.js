import { useEffect, useRef, useState } from "react";
import styles from "@/styles/home/rhs/messages.module.css";
import Rmodelmsg from "./modelmsg";
import Rusermsg from "./usermsg";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
export default function Rmessages() {
  const context = useContext(Rhscontext);
  const messagesContainerRef = useRef(null);
  const { SavedMessages, error, loading } = context;

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  }, [SavedMessages]);

  if (error) {
    return <div>{error}</div>;
  }

  if (loading) {
    return (
      <div className={styles.loadingcallui}>
        <div className={styles.loadingc}>
          <div className={styles.loading_container}>
            <div className={styles.loading_spinner}></div>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div ref={messagesContainerRef} className="middle_sub_wrapper_messages">
        {SavedMessages.map((msg, ind) => {
          return msg.isChatUI ? (
            <div>
              <Rmodelmsg msg={msg} key={ind} />
            </div>
          ) : (
            <div>
              <Rusermsg msg={msg} key={ind} />
            </div>
          );
        })}
      </div>
    </>
  );
}
