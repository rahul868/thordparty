import styles from "@/styles/reusable/feedback.module.css";
import { useContext, useState } from "react";
import Button from "./button";
import Indicator from "./indicator";
import { Gcommoncontext } from "@/context/common_global";
export default function Feedback({ close }) {
  // Global context imports
  const { currdoc, user } = useContext(Gcommoncontext);

  // Feedback states
  const [finput, setfinput] = useState("");
  const [loading, setLoading] = useState(false);
  const [isFeedbackStatus, setIsFeedbackStatus] = useState(false);
  const [isFeedbackType, setIsFeedbackType] = useState("s");
  const [isFeedbackMsg, setIsFeedbackMsg] = useState("");

  const handle_feedback_finput = async () => {
    // API call for submiting feedback.
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/user_feedback`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // content type based on your API requirements
          },
          body: JSON.stringify({
            email_id: user.email,
            fileid: currdoc.id,
            lastedittimestamp: Date.now().toString(),
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update lastaccess time for doc.");
      }
      const feedback = await response.json();
      close();
      setfinput("");
      setIsFeedbackType("s");
      setIsFeedbackMsg("Feedback submited succesfully.");
      setIsFeedbackStatus(true);
    } catch (err) {
      setfinput("");
      setIsFeedbackType("e");
      setIsFeedbackMsg("Something went wrong while updating feedback.");
      setIsFeedbackStatus(true);
    } finally {
      setLoading(false);
      setTimeout(() => {
        setIsFeedbackMsg("");
        setIsFeedbackStatus(false);
        setIsFeedbackType("");
      }, 5000);
    }
  };
  return (
    <div>
      <div className={styles.feedbackwrap}>
        <div className={styles.feedbackinput}>
          <textarea
            placeholder="Type your feedback here..."
            autoFocus
            value={finput}
            onChange={(e) => setfinput(e.target.value)}
          />
        </div>
        <Button
          disable={finput ? false : true}
          callback={handle_feedback_finput}
          loading={loading}
          title="Submit"
        />
      </div>
      <Indicator
        isOpen={isFeedbackStatus}
        msg={isFeedbackMsg}
        type={isFeedbackType}
      />
    </div>
  );
}
