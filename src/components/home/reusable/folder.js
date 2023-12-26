import styles from "@/styles/reusable/folder.module.css";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from "unique-names-generator";
import File from "./file";

export default function Folder({ group }) {
  const config = {
    dictionaries: [adjectives, colors, animals],
    separator: "-",
  };
  function limit_string(text, maxLength) {
    // Split the text into words

    if (text.length <= maxLength) {
      return text;
    }
    const words = text.split("");

    // Ensure the string has more than maxWords
    // Join the first maxWords words and add ellipsis
    const truncatedText = words.slice(0, maxLength).join("") + "...";

    // If the string is within the limits or the truncation process failed
    // Return the original string
    return truncatedText;
  }

  return (
    <div data-role-group-container className={styles.folder_wrapper}>
      <div data-role-group className={styles.folder_name_wrapper}>
        <div className={styles.folder_icon}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="512"
            height="512"
            viewBox="0 0 512 512"
            style={{
              width: 18,
              height: 18,
              display: "block",
              fill: "rgba(55, 53, 47, 0.45)",
              flexShrink: 0,
            }}
          >
            <path
              fill="none"
              stroke="rgba(55, 53, 47, 0.45)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M440 432H72a40 40 0 01-40-40V120a40 40 0 0140-40h75.89a40 40 0 0122.19 6.72l27.84 18.56a40 40 0 0022.19 6.72H440a40 40 0 0140 40v240a40 40 0 01-40 40z"
            ></path>
            <path
              fill="none"
              stroke="rgba(55, 53, 47, 0.45)"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="32"
              d="M32 192L480 192"
            ></path>
          </svg>
        </div>

        <span>{limit_string(group.groupname, 20)}</span>
        &nbsp;<svg
          xmlns="http://www.w3.org/2000/svg"
          width="13"
          height="13"
          style={{
            verticalAlign:"middle"
          }}
          fill="rgba(55, 53, 47, 0.45)"
          stroke="rgba(55, 53, 47, 0.3)"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
        </svg>
      </div>

      <div data-role-childs className={styles.folder_childswrapper}>
        <div className={styles.folder_childssubwrapper}>
          {group.childs.map((file) => {
            return <File file={file} />;
          })}
        </div>
      </div>
    </div>
  );
}
