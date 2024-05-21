import React, { useState, useEffect } from "react"
import styles from "./UserComplexSecond.module.css"

function UserComplexSecond() {
  const [textAreas, setTextAreas] = useState(Array(6).fill(""))
  const [checkboxes, setCheckboxes] = useState([])

  // textarea의 값을 처리하는 함수
  const handleArea = (value, index) => {
    const jsonText = JSON.stringify({ text: value })
    const parsedObject = JSON.parse(jsonText)

    // 상태 업데이트
    const newTextAreas = [...textAreas]
    newTextAreas[index] = parsedObject.text
    setTextAreas(newTextAreas)
    console.log(newTextAreas)
  }

  const initialCheckboxes = [
    { type: "라이브(전체)", enable: "true" },
    { type: "축구", enable: "true" },
    { type: "농구", enable: "true" },
    { type: "배구", enable: "true" },
    { type: "야구", enable: "true" },
    { type: "아이스하키", enable: "true" },
    { type: "테니스", enable: "true" },
    { type: "핸드볼", enable: "true" },
    { type: "미식축구", enable: "true" },
    { type: "호주풋볼", enable: "true" },
    { type: "탁구", enable: "true" },
    { type: "UFC", enable: "true" },
    { type: "E-스포츠", enable: "true" },
    { type: "해외배당", enable: "true" },
    { type: "크로스", enable: "true" },
    { type: "승무패", enable: "true" },
    { type: "핸디캡", enable: "true" },
    { type: "스페셜", enable: "true" },
  ]

  useEffect(() => {
    const initialStates = initialCheckboxes.map((item) => ({
      type: item.type,
      isChecked: item.enable === "true",
    }))
    setCheckboxes(initialStates)
  }, [])
  const handleCheckboxChange = (index, checked) => {
    const updatedCheckboxes = [...checkboxes]
    updatedCheckboxes[index].isChecked = checked
    setCheckboxes(updatedCheckboxes)
  }
  return (
    <div className={styles.GridWrappers}>
      <section className={styles.gridSectorWIDTH}>
        <div className={styles.Memoside}>메모</div>
        <div className={`${styles.TextSide}`}>
          {textAreas.map((text, index) => (
            <figure key={index} className={styles.selectTotalBox}>
              <textarea
                className={styles.selectSet}
                value={text}
                onInput={(event) => handleArea(event.target.value, index)}
              />
            </figure>
          ))}
        </div>
      </section>
      <section className={styles.gridSectorWIDTH2}>
        <div className={styles.Memoside2}>베팅관리</div>

        <figure className={styles.selectTotalBox2}>
          <div className={styles.selectSet2}>
            {checkboxes.map((checkbox, index) => (
              <div key={index} className={styles.checkboxTab}>
                <input
                  id={`checkbox-${index}`}
                  type="checkbox"
                  checked={checkbox.isChecked}
                  onChange={(e) => handleCheckboxChange(index, e.target.checked)}
                />
                <label htmlFor={`checkbox-${index}`}>{checkbox.type}</label>
              </div>
            ))}
          </div>
        </figure>
      </section>
    </div>
  )
}

export default UserComplexSecond
