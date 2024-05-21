import ktimeTrans from "./ktimetrans"
export default function DayTransform(datetime) {
  if (!datetime) {
    return "" // Handle null datetime
  }

  function formatDateTime(dateTime) {
    // Date and time formatting options
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false, // Use 24-hour format
    }

    // 로컬 날짜 문자열 생성 및 형식 조정
    let formattedDateTime = dateTime.toLocaleString("ko-KR", options).replace(/\.\s*/g, "-")

    // 날짜와 시간 사이의 하이픈을 공백으로 교체
    formattedDateTime = formattedDateTime.replace(/(\d{4}-\d{2}-\d{2})-(\d{2}:\d{2}:\d{2})/, "$1 $2")

    return formattedDateTime
  }

  const targetDate = new Date(datetime)

  // Add 9 hours to targetDate (correctly handle day change)
  targetDate.setTime(targetDate.getTime() + 9 * 60 * 60 * 1000)

  // Format and return the date and time
  return formatDateTime(targetDate)
}

export function fetchDate(date) {
  if (!date) {
    return ""
  }
  return ktimeTrans(date).slice(0, 10) + " " + ktimeTrans(date).slice(10 + 1)
}
export function reformatDateTime(dateTimeStr) {
  // 'T'와 'Z'를 공백으로 대체하고, 초와 뒤따르는 모든 문자를 제거합니다.
  const formatted = dateTimeStr.replace("T", " ").replace("Z", "").slice(0, -3)
  return formatted
}

export function addNineHoursAndFormatCorrectly(dateTimeStr) {
  // 'T' 앞의 공백을 제거합니다.
  const correctedDateTimeStr = dateTimeStr.replace(" T ", "T")

  // Date 객체 생성
  const date = new Date(correctedDateTimeStr)

  // 유효한 날짜인지 확인
  if (isNaN(date.getTime())) {
    return "Invalid date format"
  }

  // 9시간 추가
  date.setHours(date.getHours() + 9)

  // 날짜와 시간을 YYYY-MM-DD HH:MM 형식으로 포맷팅
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0") // 월은 0부터 시작하므로 1을 더해줍니다.
  const day = String(date.getDate()).padStart(2, "0")
  const hours = String(date.getHours()).padStart(2, "0")
  const minutes = String(date.getMinutes()).padStart(2, "0")

  // 포맷팅된 문자열 반환
  return `${year}-${month}-${day} ${hours}:${minutes}`
}
