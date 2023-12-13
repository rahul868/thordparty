import styles from "../../../styles/reusable/reset.module.css";
import { useContext, useState } from "react";
import { Rhscontext } from "@/context/provider";
import Button from "./button";
import Indicator from "./indicator";

function Reset({ close }) {
  const { setSavedMessages } = useContext(Rhscontext);

  // Reset states
  const [loading, setLoading] = useState(false);
  const [isResetStatus, setIsResetStatus] = useState(false);
  const [isResetType, setIsResetType] = useState("s");
  const [isResetMsg, setIsResetMsg] = useState("");

  const handlereset = async () => {
    // API call for submiting Reseting chaSomething went wrong while reseting chats.ts.
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/resetHistory`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify({
            email: user.email,
            fileid: currdoc.id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update lastaccess time for doc.");
      }
      const reset = await response.json();
      setIsResetType("s");
      setIsResetMsg("Chats reseted successfully.");
      setIsResetStatus(true);
      close();
      setSavedMessages([]);
    } catch (err) {
      setIsResetType("e");
      setIsResetMsg("Something went wrong while reseting chats.");
      setIsResetStatus(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsResetMsg("");
        setIsResetStatus(false);
        setIsResetType("");
      }, 5000);
    }
  };

  return (
    <div>
      <div className={styles.reste_container}>
        <div className={styles.sub_reset_container}>
          <div className={styles.text_line}>
            <p>
              Are you sure you want to reset the conversation. All messages will
              be lost. This action is not reversible
            </p>
          </div>
          <Button
            loading={loading}
            disable={false}
            callback={handlereset}
            title="Reset"
          />
        </div>
      </div>
      <Indicator isOpen={isResetStatus} msg={isResetMsg} type={isResetType} />
    </div>
  );
}

export default Reset;
