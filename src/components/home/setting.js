import { useState } from "react";
import styles from "@/styles/setting.module.css";

export default function Setting() {
  const [responseMode, setResponseMode] = useState("efficient");
  const [answersLength, setAnswersLength] = useState("medium");
  const [contentSource, setContentSource] = useState("focused");

  const handleResponseModeChange = (mode) => {
    setResponseMode(mode);
  };

  const handleAnswersLengthChange = (mode) => {
    setAnswersLength(mode);
  };

  const handleContentSourceChange = (mode) => {
    setContentSource(mode);
  };

  return (
    <div className={styles.chat_additional_setting}>
      <div className={styles.wrapping_setting}>

        <div className={styles.response_mode}>
          <span className={styles.checked}>Response Mode</span>
          <div className={styles.two_selection_response}>
            <span
              className={
                responseMode === "efficient" ? styles.active_response : ""
              }
              onClick={() => handleResponseModeChange("efficient")}
            >
              Efficient
            </span>
            <span
              className={
                responseMode === "advanced"
                  ? `${styles.active_response} ${styles.advanced}`
                  : ""
              }
              onClick={() => handleResponseModeChange("advanced")}
            >
              <p>PRO</p>&nbsp;&nbsp;Advanced
            </span>
          </div>
          <p>
            "Efficient gives quick answers," Advanced" uses OpenAI's GPT-4{" "}
            <br />
            accuracy
          </p>
        </div>
        <div className={styles.answers_length}>
          <span>Answers Length</span>
          <div className={styles.three_answers_length_options}>
            <span
              className={
                answersLength === "short" ? styles.active_response : ""
              }
              onClick={() => handleAnswersLengthChange("short")}
            >
              Short
            </span>
            <span
              className={
                answersLength === "medium"
                  ? `${styles.active_response} ${styles.medium}`
                  : ""
              }
              onClick={() => handleAnswersLengthChange("medium")}
            >
              Medium
            </span>
            <span
              className={
                answersLength === "long"
                  ? `${styles.active_response} ${styles.long}`
                  : ""
              }
              onClick={() => handleAnswersLengthChange("long")}
            >
              Long
            </span>
          </div>
        </div>
        <div className={styles.content_source}>
          <span>Content Source</span>
          <div className={styles.two_content_source_options}>
            <span
              className={
                contentSource === "focused" ? styles.active_response : ""
              }
              onClick={() => handleContentSourceChange("focused")}
            >
              Focused
            </span>
            <span
              className={
                contentSource === "expanded"
                  ? `${styles.active_response} ${styles.expanded}`
                  : ""
              }
              onClick={() => handleContentSourceChange("expanded")}
            >
              Expanded
            </span>
          </div>
          <p>
            "Focused" generates responses strictly related to the content.
            "Expanded" <br />
            Includes internet general knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
