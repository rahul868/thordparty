import { useEffect, useRef, useState } from "react";
import styles from "@/styles/home/rhs/messages.module.css";
import Rmodelmsg from "./modelmsg";
import Rusermsg from "./usermsg";
import { useContext } from "react";
import { Rhscontext } from "@/context/provider";
import Rmsgloader from "./rmsgloader";
import Loader from "./loader";

export default function Rmessages() {
  const context = useContext(Rhscontext);
  const messagesContainerRef = useRef(null);
  const { SavedMessages, isresponding } = context;

  useEffect(() => {
    const container = messagesContainerRef.current;
    if (container) {
      container.scrollIntoView({
        block: "end",
        behavior: "smooth",
      });
    }
  }, [SavedMessages]);

  return (
    <div ref={messagesContainerRef}>
      {SavedMessages.map((msg, ind) => {
        return msg.isChatUI ? (
          <div key={ind}>
            <Rmodelmsg msg={msg} />
          </div>
        ) : (
          <div key={ind}>
            <Rusermsg msg={msg} key={ind} />
          </div>
        );
      })}
      {isresponding && (
        <Rmsgloader>
          <Loader c_styles={{ background: "#444" }} />
        </Rmsgloader>
      )}
    </div>
  );
}
