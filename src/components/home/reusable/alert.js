import styles from "@/styles/reusable/alert.module.css";
export default function Alert({msg}) {
  return (
    <div className={styles.alert_wrapper}>
      <div className={styles.alert_content}>{msg}</div>
    </div>
  );
}
