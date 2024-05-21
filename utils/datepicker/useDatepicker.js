import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { useState } from "react"

/**
 * react-datepicker 핸들링 커스텀 훅
 */
const useDatepicker = () => {
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDatepick] = useState({
    start: formattedDate,
    end: formattedDate,
  })
  const handleStartDateChange = (startDate) => {
    setDatepick({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDatepick({ ...datepick, end: datePickerTrans(endDate) })
  }

  return {
    datepick,
    handleStartDateChange,
    handleEndDateChange,
  }
}

export default useDatepicker
