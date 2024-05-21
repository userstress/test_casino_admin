import style from "./CustomHeader.module.css"

export default function CustomHeader({ text, customStyle, children }) {
  return (
    <>
      <div style={customStyle} className={style.boxWrapper}>
        {text}
        {children}
      </div>
    </>
  )
}
