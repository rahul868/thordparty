import { useState, useContext, useEffect } from "react";
import styles from "@/styles/home/rhs/chat.module.css";
import Rchatinput from "../reusable/chatinput";
import Rmessages from "../reusable/messages";
import { Rhscontext } from "@/context/provider";
import { Gcommoncontext } from "@/context/common_global";
import Loader from "../reusable/loader";

export default function Rchat() {
  const [chatloading, setChatloading] = useState(false);
  const [error, setError] = useState(false);

  // Required global context data
  const { user, currdoc } = useContext(Gcommoncontext);
  const { setSavedMessages } = useContext(Rhscontext);

  // Function for updating lastaccesstime of individual doc
  const updateLastAcces = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/document_update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify({
            emailid: user.email,
            fileid: currdoc.id,
            lastedittimestamp: Date.now().toString(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update lastaccess time for doc.");
      }
      const chats_data = await response.json();
    } catch (err) {
      console.log("while updating lastaccess time of doc", err.message);
      // seterror(err.message);
    }
  };

  // Function for fetching chat hostory of individual doc
  const fetchFileChats = async () => {
    setChatloading(true);
    try {
      // Simulate API call for user file metadata
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/chatHistory?email=${user.email}&fileid=${currdoc.id}`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch user files");
      }
      const chats_data = await response.json();
      setSavedMessages(chats_data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setChatloading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      if (currdoc) {
        await fetchFileChats();
        updateLastAcces();
      }
    };
    fetchData();
  }, [currdoc]);

  if (chatloading) {
    return (
      <div className={styles.chat_loading_indicator}>
        <Loader c_styles={{ background: "#666" }} />
      </div>
    );
  }

  if (error) {
    return <>chat loading failed.</>;
  }
  return (
    <div className={styles.rhs_chat_content}>
      <div className={styles.middle_wrapper_messages}>
        <Rmessages />
      </div>
      <Rchatinput />
    </div>
  );
}
