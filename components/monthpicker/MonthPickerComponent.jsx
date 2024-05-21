import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./MonthPickerComponent.module.css"
import { ko } from "date-fns/locale"

export default function MonthPickerComponent({ text, customStyle, textStyle, getDate }) {
  const [startDate, setStartDate] = useState(new Date())

  function chdate(date) {
    {
      getDate ? getDate(date) : null
    }
    setStartDate(date)
  }

  const renderCustomHeader = ({ date, decreaseMonth, increaseMonth }) => {
    const month = date.getMonth()
    const year = date.getFullYear()

    return (
      <div style={{ margin: 10 }}>
        <span onClick={decreaseMonth}>지난 해</span>
        <span style={{ margin: "0 10px" }}>
          {year}년 {month + 1}월
        </span>
        <span onClick={increaseMonth}>다음 해</span>
      </div>
    )
  }

  return (
    <div className={styles.boxWrapper} style={customStyle}>
      {text ? <span style={textStyle}>{text}</span> : null}
      <DatePicker
        selected={startDate}
        onChange={chdate}
        dateFormat="yyyy-MM"
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        showMonthYearPicker
        dropdownMode="select"
        locale={ko}
        renderCustomHeader={renderCustomHeader}
      />
    </div>
  )
}
