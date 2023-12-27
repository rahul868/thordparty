import styles from "@/styles/reusable/popuplist.module.css";
export default function Popuplist({ list }) {
  return (
    <div className={styles.plist_wrapper}>
      <div className={styles.plist_subwrapper}>
        <ul>
          {list.map((item, ind) => {
            return (
              <li key={ind} onClick={() => item.callback(item)}>
                <span>{item.svg}</span>
                <span>{item.name}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
