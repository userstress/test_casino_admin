import style from "./CustomBar.module.css"

export default function CustomBar({ children, customStyle }) {
  return (
    <div style={customStyle} className={style.boxWrapper}>
      {children}
    </div>
  )
}
