import { useState } from "react"
import styles from "./CutomInput.module.css"

export default function CustomInput({ customStyle, inputs, placeholder }) {
  const [text, setText] = useState("")
  const onChange = (event) => {
    const {
      target: { value },
    } = event
    setText(value)
  }
  return (
    <input
      className={styles.boxWrapper}
      style={customStyle}
      type="text"
      value={inputs}
      onChange={onChange}
      placeholder={placeholder}
    />
  )
}
