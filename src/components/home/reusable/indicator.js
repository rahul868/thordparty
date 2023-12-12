import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/reusable/indicator.module.css";
import { Gcommoncontext } from "@/context/common_global";

const Indicator = () => {
  const { gindicatormsg, setgindicatormsg } = useContext(Gcommoncontext);
  useEffect(() => {
    setTimeout(() => {
      setgindicatormsg("");
    }, 8000);
  }, [gindicatormsg]);

  if (gindicatormsg) {
    return (
      <div className={styles.indicatorwrp}>
        <div className={`${styles.indicator_popup}`}>
          <p>{gindicatormsg}</p>
        </div>
      </div>
    );
  }
  return <></>;
};

export default Indicator;
