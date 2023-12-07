import styles from "@/styles/reusable/alert.module.css";
export default function Alert({ alertstatus, alerttype, alertmsg }) {
  const sector = {
    l: "#FF9900",
    e: "#721c24",
    s: "#155724",
    n: "#f1f1f1",
  };
  return (
    <div
      style={{ background: alertstatus ? sector[alerttype] : null }}
      className={`${styles.alert_strip_container} ${
        alertstatus ? styles.strip_active_animation : ""
      }`}
    >
      <span className={styles.alert_content}>{alertmsg}</span>
    </div>
  );
}
