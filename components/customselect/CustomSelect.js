import styles from "./CustomSelect.module.css"

export default function CustomSelect({ text = null, optionArr, customStyle }) {
  return (
    <select name="" id="" style={customStyle} className={styles.boxWrapper}>
      {optionArr.map((v, idx) => (
        <option value="" key={idx}>
          {v}
        </option>
      ))}
    </select>
  )
}
