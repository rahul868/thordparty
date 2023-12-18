import styles from "@/styles/reusable/feedback.module.css";
import { useContext, useState } from "react";
import Button from "./button";
import { Gcommoncontext } from "@/context/common_global";
export default function Feedback({ close }) {
  // Global context imports
  const { user, currdoc, setiopen, setimsg, setitype } =
    useContext(Gcommoncontext);

  // Feedback states
  const [finput, setfinput] = useState("");
  const [loading, setLoading] = useState(false);

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
            emailid: user.email,
            fileid: currdoc.id,
            feedback: finput,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update feedback for doc.");
      }
      const feedback = await response.json();
      setfinput("");
      setitype("s");
      setimsg("Feedback submitted successfully.");
      setiopen(true);
      close();
    } catch (err) {
      setfinput("");
      setitype("e");
      setimsg("Something went wrong while updating feedback.");
      setiopen(true);
    } finally {
      setLoading(false);
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
            onChange={(e) => {
              setfinput(e.target.value);
            }}
          />
        </div>
        {finput.length > 0 && (
          <Button
            disable={false}
            callback={handle_feedback_finput}
            loading={loading}
            title="Submit"
          />
        )}
      </div>
    </div>
  );
}
