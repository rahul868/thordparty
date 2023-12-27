import styles from "@/styles/reusable/namemodel.module.css";
export default function Namemodel({ name, c_style }) {
  let re_name = name.split(" ");
  return (
    <div style={c_style} className={styles.model_profile}>
      {re_name.length > 1 ? re_name[0][0] + re_name[1][0] : re_name[0][0]}
    </div>
  );
}
