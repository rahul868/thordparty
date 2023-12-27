import styles from "@/styles/home/rhs/chat.module.css";
import Rchatinput from "../reusable/chatinput";
import Rmessages from "../reusable/messages";

export default function Rchat() {
  return (
    <div className={styles.rhs_chat_content}>
      <div className={styles.middle_wrapper_messages}>
        <Rmessages />
      </div>
      <Rchatinput />
    </div>
  );
}
