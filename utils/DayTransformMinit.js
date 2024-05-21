export default function DayTransformMinit(datetime) {
  if (!datetime) {
    return "" // Handle null datetime
  }

  function formatDateTime(dateTimeString) {
    return `${dateTimeString.getFullYear()}-${String(dateTimeString.getMonth() + 1).padStart(2, "0")}-${String(
      dateTimeString.getDate(),
    ).padStart(2, "0")} ${String(dateTimeString.getHours()).padStart(2, "0")}:${String(
      dateTimeString.getMinutes(),
    ).padStart(2, "0")}`
  }
  const currentDate = new Date()
  const targetDate = new Date(datetime.replace(/\s/g, ""))

  // Add 9 hours to targetDate
  targetDate.setHours(targetDate.getHours() + 9)

  // Calculate day difference
  const dayDiff = (currentDate.getTime() - targetDate.getTime()) / (24 * 60 * 60 * 1000)

  // Format and return the date and time
  return formatDateTime(targetDate)
}

export function DayTransformMinitUTC(datetime) {
  if (!datetime) {
    return "" // Handle null datetime
  }

  function formatDateTime(dateTimeString) {
    // 초(second) 부분을 제외하고 포맷을 변경합니다.
    return dateTimeString
      .replace(/\.\s*/g, "-")
      .replace(/\s/g, " ")
      .replace(/:/g, ":")
      .replace(/-/g, "-")
      .replace(/(\d{4})-(\d{2})-(\d{2})\s(\d{2}:\d{2}):(\d{2})/, "$1-$2-$3 $4")
  }

  const currentDate = new Date()
  const targetDate = new Date(datetime.replace(/\s/g, ""))

  // Date and time formatting options - 초(second) 제외, UTC 기준
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour format
    timeZone: "UTC", // Set timezone to UTC
  }

  // Calculate day difference in UTC
  const dayDiff = (currentDate.getTime() - targetDate.getTime()) / (24 * 60 * 60 * 1000)

  // Format and return the date and time in UTC
  console.log(targetDate)
  console.log(formatDateTime(targetDate.toLocaleString("ko-KR", options)).replace(/ /g, "&nbsp;"))
  return formatDateTime(targetDate.toLocaleString("ko-KR", options)).replace(/ /g, "&nbsp;")
}
