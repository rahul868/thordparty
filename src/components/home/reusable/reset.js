import styles from "../../../styles/reusable/reset.module.css";
import { useContext, useState } from "react";
import { Rhscontext } from "@/context/provider";
import Button from "./button";
import Indicator from "./indicator";
import { Gcommoncontext } from "@/context/common_global";

function Reset({ close }) {
  const { setSavedMessages } = useContext(Rhscontext);
  const { user, currdoc, setiopen, setimsg, setitype } =
    useContext(Gcommoncontext);
  // Reset states
  const [loading, setLoading] = useState(false);

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
            emailid: user.email,
            fileid: currdoc.id,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update lastaccess time for doc.");
      }
      const reset = await response.json();
      setitype("s");
      setimsg("Chats reseted successfully.");
      setiopen(true);
      close();
      setSavedMessages([]);
    } catch (err) {
      console.log(err);
      setitype("e");
      setimsg("Something went wrong while reseting chats.");
      setiopen(true);
    } finally {
      setLoading(false);
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
    </div>
  );
}

export default Reset;
