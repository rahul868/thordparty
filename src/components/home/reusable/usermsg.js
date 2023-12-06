import styles from "@/styles/home/rhs/usermsg.module.css";
import { Gcommoncontext } from "@/context/common_global";
import { useContext } from "react";
import Namemodel from "./namemodel";
function Rusermsg({ msg }) {
  const { user } = useContext(Gcommoncontext);
  return (
    <>
      <div className={styles.msg_for_ai}>
        <div className={styles.msg_sub_for_ai}>
          <div className={`${styles.box_wrapper_msg} ${styles.centered}`}>
            {user.a_profile ? (
              <img src={user.a_profile} alt="" />
            ) : (
              <Namemodel name={user.name} />
            )}
            <div className={styles.summary_content}>{msg.summary}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Rusermsg;
