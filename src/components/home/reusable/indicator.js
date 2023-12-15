import { Gcommoncontext } from "@/context/common_global";
import styles from "@/styles/reusable/indicator.module.css";
import { useContext, useEffect } from "react";

const Indicator = () => {
  const { iopen, imsg, itype, setiopen, setimsg } = useContext(Gcommoncontext);
  const sector = {
    l: "#006AFF",
    e: "#721c24",
    s: "#155724",
    n: "#f1f1f1",
  };

  useEffect(() => {
    if (iopen) {
      // Automatically close the popup after 3000 milliseconds (adjust as needed)
      const timeoutId = setTimeout(() => {
        setiopen(false);
        setimsg("");
      }, 5000);

      // Clear the timeout if the component unmounts or iopen changes
      return () => clearTimeout(timeoutId);
    }
  }, [iopen, setiopen]);

  if (!iopen) {
    return null;
  }

  return (
    <div className={styles.indicatorwrp}>
      <div
        style={{ backgroundColor: sector[itype] }}
        className={`${styles.indicator_popup}`}
      >
        <p>{imsg}</p>
      </div>
    </div>
  );
};

export default Indicator;
