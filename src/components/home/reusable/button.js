import styles from "@/styles/reusable/btn.module.css";
import Loader from "./loader";

export default function Button({
  disable,
  callback,
  title,
  cstyles,
  className,
  loading,
  btn_id,
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
        btn_id={btn_id}
        onClick={(e) => callthis(e)}
        disabled={disable || loading}
      >
        {loading ? <Loader c_styles={{ backgroundColor: "white" }} /> : title}
      </button>
    </div>
  );
}
