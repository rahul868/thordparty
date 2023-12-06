import { useEffect, useRef, useState } from "react";
import Rmodelmsg from "./modelmsg";
import Rusermsg from "./usermsg";
import { useContext } from "react";
import {Rhscontext} from "@/context/provider";
export default function Rmessages() {
  const context = useContext(Rhscontext);
  const { SavedMessages, messagesContainerRef } = context;

  useEffect(() => {
    messagesContainerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [SavedMessages]);

  return (
    <>
      <div className="middle_sub_wrapper_messages">
        {SavedMessages.map((msg, ind) => {
          return msg.isChatAi ? (
            <div ref={messagesContainerRef}>
              <Rmodelmsg msg={msg} key={ind} />
            </div>
          ) : (
            <div ref={messagesContainerRef}>
              <Rusermsg msg={msg} key={ind} />
            </div>
          );
        })}
      </div>
    </>
  );
}
