import styles from "@/styles/reusable/input.module.css";

const Input = ({
  disable,
  onchange,
  placeholder,
  type,
  unique_id,
  autoFocus,
  value,
  btn_id,
}) => {
  return (
    <div className={styles.input_group_pointer}>
      <label className={styles.input_label}>{placeholder}</label>
      <input
        autoFocus={autoFocus}
        animate="true"
        onChange={onchange}
        disable={disable}
        data={unique_id}
        type={type}
        value={value}
        btn_id={btn_id}
      />
    </div>
  );
};

export { Input };
