import styles from "@/styles/setting.module.css";

export default function Setting() {
  function changeActive(mode) {
    // Remove active class from all spans
    const spans = document.querySelectorAll(".two_selection_response span");
    spans.forEach((span) => span.classList.remove("active_response"));

    // Add active class to the clicked span
    const clickedSpan = document.getElementById(mode);
    clickedSpan.classList.add("active_response");
  }

  function changeActiveanswers(mode) {
    // Remove active class from all spans
    const spans = document.querySelectorAll(
      ".three_answers_length_options span"
    );
    spans.forEach((span) => span.classList.remove("active_response"));

    // Add active class to the clicked span
    const clickedSpan = document.getElementById(mode);
    clickedSpan.classList.add("active_response");
  }

  function changeActivecontent(mode) {
    // Remove active class from all spans
    const spans = document.querySelectorAll(".two_content_source_options span");
    spans.forEach((span) => span.classList.remove("active_response"));

    // Add active class to the clicked span
    const clickedSpan = document.getElementById(mode);
    clickedSpan.classList.add("active_response");
  }

  return (
    <div className={styles.chat_additional_setting}>
      <div className={styles.wrapping_setting}>
        <div className={styles.heading_for_setting}>
          <span>Chat Experience</span>
        </div>

        <div className={styles.response_mode}>
          <span className={styles.cheked}>Response Mode</span>
          <div className={styles.two_selection_response}>
            <span
              id="efficient"
              className={styles.active_response}
              onClick={() => changeActive("efficient")}
            >
              Efficient
            </span>
            <span
              id="advanced"
              className={styles.manage}
              onClick={() => changeActive("advanced")}
            >
              {" "}
              <p>PRO</p>&nbsp;&nbsp;Advanced
            </span>
          </div>
          <p>
            "Efficient gives quick answers,"Advnced" uses OpneAI's GPT-4 <br />
            accuracy
          </p>
        </div>
        <div className={styles.answers_length}>
          <span>Answers Length</span>
          <div className={styles.three_answers_length_options}>
            <span
              id={styles.short}
              onClick={() => changeActiveanswers("short")}
            >
              Short
            </span>
            <span
              className={styles.active_response}
              id={styles.medium}
              onClick={() => changeActiveanswers("medium")}
            >
              Medium
            </span>
            <span id={styles.long} onClick={() => changeActiveanswers("long")}>
              Long
            </span>
          </div>
        </div>
        <div className={styles.content_source}>
          <span>Content Source</span>
          <div className={styles.two_content_source_options}>
            <span
              id="focused"
              className={styles.active_response}
              onClick={() => changeActivecontent("focused")}
            >
              Focused
            </span>
            <span
              id="exanded"
              className={styles.expanded}
              onClick={() => changeActivecontent("exanded")}
            >
              Expanded
            </span>
          </div>
          <p>
            "Focused" ganerates responses strictly related to the content.
            "Expanded" <br />
            Includes internet ganeral knowledge.
          </p>
        </div>
      </div>
    </div>
  );
}
