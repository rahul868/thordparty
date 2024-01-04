import styles from "@/styles/reusable/splash.module.css";

export default function Serror() {
  return (
    <div className={styles.splashwrapper}>
      <div className={styles.splassubhwrapper}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          style={{
            width: 60,
            height: 60,
            WebkitFlexShrink: "0",
            MsFlexShrink: "0",
            flexShrink: "0",
            marginRight: 5,
            stroke:"rgba(55, 53, 47, 0.85)"
          }}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="feather feather-alert-triangle"
          viewBox="0 0 24 24"
        >
          <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"></path>
          <path d="M12 9L12 13"></path>
          <path d="M12 17L12.01 17"></path>
        </svg>
        <div style={{ textAlign: "center", maxWidth: 300, color: "#666",padding:10 }}>
          Sorry for inconvinience. Something is going wrong from our side.
          Please try again later.
        </div>
      </div>
    </div>
  );
}
