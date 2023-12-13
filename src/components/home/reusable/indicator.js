import styles from "@/styles/reusable/indicator.module.css";

const Indicator = ({ isOpen, msg, type }) => {
  const sector = {
    l: "#006AFF",
    e: "#721c24",
    s: "#155724",
    n: "#f1f1f1",
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.indicatorwrp}>
      <div
        style={{ backgroundColor: sector[type] }}
        className={`${styles.indicator_popup}`}
      >
        <p>{msg}</p>
      </div>
    </div>
  );
};

export default Indicator;
