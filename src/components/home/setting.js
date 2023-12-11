import { useState, useRef, useEffect } from "react";
import styles from "@/styles/setting.module.css";

export default function Setting() {
  const [responseMode, setResponseMode] = useState("efficient");
  const [answersLength, setAnswersLength] = useState("medium");
  const [contentSource, setContentSource] = useState("focused");
  const [TextLength, setTextLength] = useState("normal");

  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Auto-detect");
  const dropdownRef = useRef(null);

  const handleResponseModeChange = (mode) => {
    setResponseMode(mode);
  };

  const handleAnswersLengthChange = (mode) => {
    setAnswersLength(mode);
  };

  const handleContentSourceChange = (mode) => {
    setContentSource(mode);
  };

  const handleTextLength = (mode) => {
    setTextLength(mode);
  };

  const handleOptionClick = (value) => {
    setSelectedValue(value);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const dropdownOptions = [
    { value: "auto", label: "Auto-detect" },
    { value: "arabic", label: "Arabic" },
    { value: "chinese", label: "Chinese" },
    { value: "dutch", label: "Dutch" },
    { value: "english", label: "English" },
    { value: "french", label: "French" },
    { value: "german", label: "German" },
    { value: "greek", label: "Greek" },
    { value: "indonesian", label: "Indonesian" },
    { value: "italian", label: "Italian" },
    { value: "japanese", label: "Japanese" },
    { value: "korean", label: "Korean" },
    { value: "latin", label: "Latin" },
    { value: "malay", label: "Malay" },
    { value: "polish", label: "Polish" },
    { value: "portuguese", label: "Portuguese" },
    { value: "romanian", label: "Romanian" },
    { value: "russian", label: "Russian" },
    { value: "spanish", label: "Spanish" },
    { value: "tamil", label: "Tamil" },
    { value: "turkish", label: "Turkish" },
    { value: "uzbek", label: "Uzbek" },
  ];

  return (
    <div className={styles.chat_additional_setting}>
      <div className={styles.wrapping_setting}>
        <div className={styles.heading_for_setting}>
          <span>Chat Experience</span>
        </div>
        <div className={styles.custom_dropdown} ref={dropdownRef}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-globe2"
              viewBox="0 0 16 16"
            >
              <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m7.5-6.923c-.67.204-1.335.82-1.887 1.855-.143.268-.276.56-.395.872.705.157 1.472.257 2.282.287zM4.249 3.539c.142-.384.304-.744.481-1.078a6.7 6.7 0 0 1 .597-.933A7.01 7.01 0 0 0 3.051 3.05c.362.184.763.349 1.198.49zM3.509 7.5c.036-1.07.188-2.087.436-3.008a9.124 9.124 0 0 1-1.565-.667A6.964 6.964 0 0 0 1.018 7.5h2.49zm1.4-2.741a12.344 12.344 0 0 0-.4 2.741H7.5V5.091c-.91-.03-1.783-.145-2.591-.332M8.5 5.09V7.5h2.99a12.342 12.342 0 0 0-.399-2.741c-.808.187-1.681.301-2.591.332zM4.51 8.5c.035.987.176 1.914.399 2.741A13.612 13.612 0 0 1 7.5 10.91V8.5zm3.99 0v2.409c.91.03 1.783.145 2.591.332.223-.827.364-1.754.4-2.741zm-3.282 3.696c.12.312.252.604.395.872.552 1.035 1.218 1.65 1.887 1.855V11.91c-.81.03-1.577.13-2.282.287zm.11 2.276a6.696 6.696 0 0 1-.598-.933 8.853 8.853 0 0 1-.481-1.079 8.38 8.38 0 0 0-1.198.49 7.01 7.01 0 0 0 2.276 1.522zm-1.383-2.964A13.36 13.36 0 0 1 3.508 8.5h-2.49a6.963 6.963 0 0 0 1.362 3.675c.47-.258.995-.482 1.565-.667zm6.728 2.964a7.009 7.009 0 0 0 2.275-1.521 8.376 8.376 0 0 0-1.197-.49 8.853 8.853 0 0 1-.481 1.078 6.688 6.688 0 0 1-.597.933zM8.5 11.909v3.014c.67-.204 1.335-.82 1.887-1.855.143-.268.276-.56.395-.872A12.63 12.63 0 0 0 8.5 11.91zm3.555-.401c.57.185 1.095.409 1.565.667A6.963 6.963 0 0 0 14.982 8.5h-2.49a13.36 13.36 0 0 1-.437 3.008zM14.982 7.5a6.963 6.963 0 0 0-1.362-3.675c-.47.258-.995.482-1.565.667.248.92.4 1.938.437 3.008zM11.27 2.461c.177.334.339.694.482 1.078a8.368 8.368 0 0 0 1.196-.49 7.01 7.01 0 0 0-2.275-1.52c.218.283.418.597.597.932zm-.488 1.343a7.765 7.765 0 0 0-.395-.872C9.835 1.897 9.17 1.282 8.5 1.077V4.09c.81-.03 1.577-.13 2.282-.287z" />
            </svg>{" "}
            Language
          </span>
          <div
            className={styles.dropdown_button}
            onClick={() => setIsOpen(!isOpen)}
          >
            {selectedValue}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-caret-down-fill"
              viewBox="0 0 16 16"
            >
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
          {isOpen && (
            <div className={styles.dropdown_content}>
              {dropdownOptions.map((option) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionClick(option.value)}
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
        <div className={styles.response_mode}>
          <span className={styles.checked}>
            <svg
              viewBox="0 0 20 20"
              style={{
                width: 20,
                height: "100%",
                WebkitFlexShrink: "0",
                MsFlexShrink: "0",
                flexShrink: "0",
              }}
              fill="rgba(0,0,0,0.9)"
              className="sidebarUpdates"
              display="block"
            >
              <path d="M6.877 10.86a.556.556 0 01-.4-.159.534.534 0 01-.159-.393c0-.152.053-.282.16-.387a.556.556 0 01.399-.159h2.57V6.245c0-.156.054-.287.16-.393a.527.527 0 01.387-.159c.156 0 .287.053.393.159a.534.534 0 01.159.393v4.063a.534.534 0 01-.159.393.534.534 0 01-.393.16H6.877zM10 16.617a6.357 6.357 0 01-2.558-.52 6.683 6.683 0 01-2.114-1.428 6.795 6.795 0 01-1.434-2.108 6.44 6.44 0 01-.515-2.564c0-.906.172-1.756.515-2.552.347-.8.823-1.504 1.428-2.114a6.685 6.685 0 012.114-1.428c.8-.347 1.652-.52 2.558-.52.905 0 1.758.173 2.558.52a6.59 6.59 0 012.114 1.428A6.773 6.773 0 0116.1 7.445c.347.796.52 1.646.52 2.552 0 .91-.173 1.764-.52 2.564a6.795 6.795 0 01-1.435 2.108 6.608 6.608 0 01-2.107 1.428c-.8.347-1.652.52-2.558.52zm0-1.453c.715 0 1.384-.133 2.006-.4a5.23 5.23 0 001.65-1.105 5.1 5.1 0 001.51-3.663c.001-.714-.134-1.383-.405-2.005a5.179 5.179 0 00-1.111-1.65A5.105 5.105 0 009.994 4.83c-.716 0-1.386.133-2.013.4a5.2 5.2 0 00-1.644 1.11A5.108 5.108 0 004.84 9.997c0 .72.132 1.393.394 2.02.267.621.637 1.17 1.11 1.643.475.47 1.023.838 1.645 1.105.626.267 1.297.4 2.012.4z"></path>
            </svg>
            Response Mode
          </span>
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
          <span>
            <svg
              viewBox="0 0 20 20"
              style={{
                width: 20,
                height: 20,
                WebkitFlexShrink: "0",
                MsFlexShrink: "0",
                flexShrink: "0",
              }}
              fill="inherit"
              className="settingsNotificationsAndPersonal"
              display="block"
            >
              <path d="M12.536 7.549c.738 0 1.367-.458 1.627-1.108h2.263c.335 0 .622-.294.622-.649 0-.355-.28-.65-.622-.65H14.17a1.762 1.762 0 00-1.634-1.107c-.738 0-1.374.458-1.634 1.108H3.595a.643.643 0 00-.643.649c0 .355.287.65.643.65h7.307c.26.649.896 1.107 1.634 1.107zm0-.923a.834.834 0 01-.84-.834c0-.479.375-.84.84-.84.472 0 .834.361.834.84a.824.824 0 01-.834.834zM3.567 9.401c-.335 0-.615.287-.615.65 0 .348.287.642.615.642h2.345c.253.65.889 1.115 1.634 1.115.731 0 1.367-.465 1.627-1.115h7.232a.642.642 0 00.643-.642.64.64 0 00-.643-.65H9.173a1.76 1.76 0 00-1.627-1.107c-.738 0-1.374.458-1.634 1.107H3.567zm3.979 1.484a.83.83 0 01-.84-.834c0-.479.368-.841.84-.841s.834.362.834.84a.824.824 0 01-.834.835zm4.99 5.175c.738 0 1.374-.458 1.634-1.108h2.256c.335 0 .622-.294.622-.65 0-.362-.28-.649-.622-.649h-2.263a1.746 1.746 0 00-1.627-1.107c-.738 0-1.374.458-1.634 1.107H3.595a.643.643 0 00-.643.65c0 .355.287.65.643.65h7.307c.26.649.896 1.107 1.634 1.107zm0-.916a.84.84 0 01-.84-.841c0-.472.375-.841.84-.841.472 0 .834.37.834.84a.83.83 0 01-.834.842z"></path>
            </svg>
            Answers Length
          </span>
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
          <span>
            <svg
              viewBox="0 0 20 20"
              style={{
                width: 20,
                height: "100%",
                WebkitFlexShrink: "0",
                MsFlexShrink: "0",
                flexShrink: "0",
              }}
              fill="rgba(0,0,0,0.9)"
              className="sidebarSearch"
              display="block"
            >
              <path
                fillRule="evenodd"
                d="M3.246 8.82c0-.765.144-1.483.43-2.153A5.673 5.673 0 014.88 4.89a5.457 5.457 0 013.93-1.634c.77 0 1.49.143 2.16.43a5.523 5.523 0 011.778 1.204c.51.51.91 1.103 1.196 1.777.292.67.438 1.388.438 2.153 0 .602-.094 1.174-.28 1.716a5.496 5.496 0 01-.76 1.484l3.118 3.13a.842.842 0 01.212.322c.05.123.075.253.075.39 0 .19-.043.364-.13.519a.983.983 0 01-.875.499c-.137 0-.269-.025-.396-.075a.927.927 0 01-.335-.22l-3.138-3.137a5.801 5.801 0 01-1.435.69 5.33 5.33 0 01-1.627.247 5.457 5.457 0 01-2.16-.43 5.6 5.6 0 01-1.771-1.197c-.51-.51-.912-1.1-1.203-1.77a5.475 5.475 0 01-.43-2.168zm1.456 0c0 .57.105 1.103.315 1.6.214.497.51.934.888 1.312.379.374.816.668 1.313.882a3.98 3.98 0 001.593.321c.57 0 1.102-.107 1.6-.32a4.154 4.154 0 002.194-2.195c.214-.497.32-1.03.32-1.6a3.98 3.98 0 00-.32-1.592 4.177 4.177 0 00-.89-1.313 4.006 4.006 0 00-1.305-.882 3.997 3.997 0 00-1.6-.321 3.98 3.98 0 00-1.592.321c-.497.21-.934.504-1.313.882a4.178 4.178 0 00-.888 1.313 4.054 4.054 0 00-.315 1.592z"
                clipRule="evenodd"
              ></path>
            </svg>
            Content Source
          </span>
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
        <div className={styles.text_length}>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-fonts"
              viewBox="0 0 16 16"
            >
              <path d="M12.258 3h-8.51l-.083 2.46h.479c.26-1.544.758-1.783 2.693-1.845l.424-.013v7.827c0 .663-.144.82-1.3.923v.52h4.082v-.52c-1.162-.103-1.306-.26-1.306-.923V3.602l.431.013c1.934.062 2.434.301 2.693 1.846h.479z" />
            </svg>
            Text Size
          </span>
          <div className={styles.three_options_text_size}>
            <span
              className={TextLength === "small" ? styles.active_response : ""}
              onClick={() => handleTextLength("small")}
            >
              Small
            </span>
            <span
              className={
                TextLength === "normal"
                  ? `${styles.active_response} ${styles.normal}`
                  : ""
              }
              onClick={() => handleTextLength("normal")}
            >
              Normal
            </span>
            <span
              className={
                TextLength === "Big"
                  ? `${styles.active_response} ${styles.Big}`
                  : ""
              }
              onClick={() => handleTextLength("Big")}
            >
              Big
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
