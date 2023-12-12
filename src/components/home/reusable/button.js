import styles from "@/styles/reusable/btn.module.css";
export default function Button({
  disable,
  callback,
  title,
  cstyles,
  className,
}) {
  const callthis = (e) => {
    callback(e);
  };
  return (
    <div className={styles.btn_wrapper}>
      <button
        style={{
          background: !disable ? "var(--app-color-code)" : "",
          color: !disable ? "white" : "",
        }}
        onClick={(e) => callthis(e)}
        disabled={disable}
      >
        {title}
      </button>
    </div>
  );
}
