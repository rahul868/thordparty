import styles from "@/styles/reusable/btn.module.css";
export default function Button({
  disable,
  callback,
  title,
  cstyles,
  className,
}) {
  const callthis = () => {
    document.querySelectorAll("[data-g-navbar-flyer]").forEach((ele) => {
      ele.classList.remove("popup_container_active");
    });
    document.querySelector("#overlay").classList.remove("active_overlay");
    callback();
  };
  return (
    <div className={styles.btn_wrapper}>
      <button
        style={{
          background: !disable ? "dodgerblue" : "",
          color: !disable ? "white" : "",
        }}
        onClick={callthis}
        disabled={disable}
      >
        {title}
      </button>
    </div>
  );
}
