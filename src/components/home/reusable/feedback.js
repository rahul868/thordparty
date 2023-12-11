import styles from "@/styles/reusable/feedback.module.css";
import { useState } from "react";
import Button from "./button";
export default function Feedback() {
  const [finput, setfinput] = useState("");

  const handle_finput = () => {
    console.log("clicked");
    // API call for submiting feedback.
  };
  return (
    <div className={styles.feedbackwrap}>
      <div className={styles.feedbackinput}>
        <h4>Have feedback?</h4>
        <textarea
          placeholder="Type your feedback here..."
          autoFocus
          onChange={(e) => setfinput(e.target.value)}
        />
      </div>
      <Button
        disable={finput ? false : true}
        callback={handle_finput}
        title="Submit"
      />
    </div>
  );
}
