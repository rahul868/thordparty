import styles from "@/styles/home/rhs/chat.module.css";
import Rchatinput from "../reusable/chatinput";
import Rmessages from "../reusable/messages";
import Popup from "../reusable/popup";
import Rsentiment from "../reusable/sentiments";
import { useState } from "react";

export default function Rchat() {

  const handle_chat_input = (query) => {
    setMsg([
      ...msg,
      {
        isChatAi: false,
        avatar:
          "https://media.licdn.com/dms/image/D4E16AQE54TLrhhHKjA/profile-displaybackgroundimage-shrink_200_800/0/1686392718502?e=1706140800&v=beta&t=QZTI2Y4ylU3qimvohM6OU9uOlimiDsK6Xe_Bfiad_5I",
        Summary: query,
      },
    ]);
  };
  return (
    <div className={styles.rhs_chat_content}>
      <div className={styles.middle_wrapper_messages}>
        <Rmessages />
      </div>
      {/* <Rsentiment /> */}
      <Rchatinput call={handle_chat_input} />
    </div>
  );
}
