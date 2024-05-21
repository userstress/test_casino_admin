//
import React, { useEffect, useRef, useState } from "react"
import styles from "./menuList.module.css"

export default function MenuList(props) {
  const showMenu = props.showMenu
  const component = props.component
  const ref = useRef(null)
  const [height, setHeight] = useState(0)

  useEffect(() => {
    if (ref.current) {
      // DOM 요소의 clientHeight를 가져와서 state에 저장
      const elementHeight = ref.current.clientHeight
      setHeight(elementHeight)
    }
  }, [ref, showMenu])

  return (
    <div
      className={`${styles.subMenuItem} ${showMenu && styles.isDropped}`}
      style={showMenu ? { height: height + 5 } : { height: "0px" }}
    >
      <ul className={`${styles.menuList}`} ref={ref}>
        {component}
      </ul>
    </div>
  )
}
