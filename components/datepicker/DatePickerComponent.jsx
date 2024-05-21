import { useState } from "react"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import styles from "./DatePickerComponent.module.css"
import { ko } from "date-fns/locale"

export default function DatePickerComponent({
  text,
  customStyle,
  textStyle,
  getDate,
  isMinit,
  isMonth = false,
  isStart,
}) {
  const [startDate, setStartDate] = useState(new Date())

  function chdate(date) {
    {
      getDate ? getDate(date) : null
    }
    setStartDate(date)
  }

  const dateFormat = isMonth ? "yyyy-MM" : isMinit ? "yyyy-MM-dd HH:mm" : "yyyy-MM-dd"

  return (
    <div className={styles.boxWrapper} style={customStyle}>
      {text ? <span style={textStyle}>{text}</span> : null}
      <DatePicker
        selected={startDate}
        onChange={chdate}
        dateFormat={dateFormat}
        peekNextMonth
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        locale={ko}
        {...(isMinit ? { showTimeSelect: true } : {})}
      />
    </div>
  )
}
