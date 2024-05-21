function datePickerTrans(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 월은 0부터 시작하므로 1을 더합니다.
  const day = date.getDate()

  // 월과 일을 항상 두 자리수로 표시하기 위해 '0'을 추가합니다.
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day

  return `${year}-${formattedMonth}-${formattedDay}`
}

export default datePickerTrans

export function datePickerTransMin(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 월은 0부터 시작하므로 1을 더합니다.
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // 월, 일, 시, 분을 항상 두 자리수로 표시하기 위해 '0'을 추가합니다.
  const formattedMonth = month < 10 ? `0${month}` : month
  const formattedDay = day < 10 ? `0${day}` : day
  const formattedHours = hours < 10 ? `0${hours}` : hours
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes

  return `${year}-${formattedMonth}-${formattedDay} ${formattedHours}:${formattedMinutes}`
}
export function datePickerTransMonth(date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 월은 0부터 시작하므로 1을 더합니다.

  // 월과 일을 항상 두 자리수로 표시하기 위해 '0'을 추가합니다.
  const formattedMonth = month < 10 ? `0${month}` : month

  return `${year}-${formattedMonth}`
}
