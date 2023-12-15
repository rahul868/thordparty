import { Gcommoncontext } from "@/context/common_global";
import styles from "@/styles/reusable/alert.module.css";
import { useContext } from "react";
export default function Alert() {
  const { pastatus, pamsg, pasecmsg, patype, isfirstupload } =
    useContext(Gcommoncontext);
  const sector = {
    l: "#006AFF",
    e: "#721c24",
    s: "#155724",
    n: "#f1f1f1",
  };
  // if (isfirstupload) {
  //   return <></>;
  // }
  return (
    <div
      style={{ background: pastatus ? sector[patype] : null }}
      className={`${styles.alert_strip_container} ${
        pastatus ? styles.strip_active_animation : ""
      }`}
    >
      <div className={styles.paalert_container}>
        {patype == "l" ? (
          <div class={`${styles.infinite_round_animation} ${styles.pa_icon}`}>
            <svg
              role="graphics-symbol"
              viewBox="0 0 16 16"
              class="page"
              style={{
                width: 16,
                height: 16,
                display: "block",
                fill: "white",
                flexShrink: 0,
              }}
            >
              <path d="M4.35645 15.4678H11.6367C13.0996 15.4678 13.8584 14.6953 13.8584 13.2256V7.02539C13.8584 6.0752 13.7354 5.6377 13.1406 5.03613L9.55176 1.38574C8.97754 0.804688 8.50586 0.667969 7.65137 0.667969H4.35645C2.89355 0.667969 2.13477 1.44043 2.13477 2.91016V13.2256C2.13477 14.7021 2.89355 15.4678 4.35645 15.4678ZM4.46582 14.1279C3.80273 14.1279 3.47461 13.7793 3.47461 13.1436V2.99219C3.47461 2.36328 3.80273 2.00781 4.46582 2.00781H7.37793V5.75391C7.37793 6.73145 7.86328 7.20312 8.83398 7.20312H12.5186V13.1436C12.5186 13.7793 12.1836 14.1279 11.5205 14.1279H4.46582ZM8.95703 6.02734C8.67676 6.02734 8.56055 5.9043 8.56055 5.62402V2.19238L12.334 6.02734H8.95703ZM10.4336 9.00098H5.42969C5.16992 9.00098 4.98535 9.19238 4.98535 9.43164C4.98535 9.67773 5.16992 9.86914 5.42969 9.86914H10.4336C10.6797 9.86914 10.8643 9.67773 10.8643 9.43164C10.8643 9.19238 10.6797 9.00098 10.4336 9.00098ZM10.4336 11.2979H5.42969C5.16992 11.2979 4.98535 11.4893 4.98535 11.7354C4.98535 11.9746 5.16992 12.1592 5.42969 12.1592H10.4336C10.6797 12.1592 10.8643 11.9746 10.8643 11.7354C10.8643 11.4893 10.6797 11.2979 10.4336 11.2979Z"></path>
            </svg>
          </div>
        ) : (
          <></>
        )}
        {patype == "s" ? (
          <div className={styles.static_success_circle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: 20,
                height: 20,
                display: "block",
                fill: "white",
                flexShrink: 0,
              }}
              viewBox="-3.5 0 19 19"
              class="cf-icon-svg"
            >
              <path d="M4.63 15.638a1.028 1.028 0 0 1-.79-.37L.36 11.09a1.03 1.03 0 1 1 1.58-1.316l2.535 3.043L9.958 3.32a1.029 1.029 0 0 1 1.783 1.03L5.52 15.122a1.03 1.03 0 0 1-.803.511.89.89 0 0 1-.088.004z" />
            </svg>
          </div>
        ) : (
          <></>
        )}

        {patype == "e" ? (
          <div className={styles.static_success_circle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              style={{
                width: 18,
                height: 18,
                display: "block",
                fill: "white",
                flexShrink: 0,
              }}
              viewBox="0 0 200 200"
              data-name="Layer 1"
              id="Layer_1"
            >
              <title />
              <path d="M114,100l49-49a9.9,9.9,0,0,0-14-14L100,86,51,37A9.9,9.9,0,0,0,37,51l49,49L37,149a9.9,9.9,0,0,0,14,14l49-49,49,49a9.9,9.9,0,0,0,14-14Z" />
            </svg>
          </div>
        ) : (
          <></>
        )}
        <div className={styles.content_block}>
          <span className={styles.alert_con1}>{pamsg}</span>
          <div className={styles.alert_con2}>{pasecmsg}</div>
          {patype == "s" ? (
            <div className={styles.alert_con2}>
              Your files will reflect in your left file section.
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
