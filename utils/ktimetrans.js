export default function ktimeTrans(utcTimeStr) {
  // 입력된 시간 문자열에서 불필요한 공백 제거
  const normalizedUtcTimeStr = utcTimeStr?.replace(/\s+/g, "")

  // UTC 시간을 Date 객체로 변환 (UTC 기준)
  const utcDate = new Date(normalizedUtcTimeStr)

  if (isNaN(utcDate.getTime())) {
    // 날짜가 유효하지 않은 경우
    return "Invalid Date"
  }

  // 한국은 UTC+9임을 고려하여 밀리초 단위로 9시간을 추가
  const koreaTime = new Date(utcDate.getTime() + 60 * 60 * 1000)

  // 년, 월, 일, 시간, 분을 추출 (로컬 시간 기준)
  const year = koreaTime.getFullYear()
  const month = koreaTime.getMonth() + 1 // 월은 0부터 시작하므로 1을 더함
  const day = koreaTime.getDate()
  const hour = koreaTime.getHours()
  const minute = koreaTime.getMinutes()

  // "YYYY-MM-DD HH:mm" 형식으로 반환
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export function ktimeTrans123(utcTimeStr) {
  // 입력된 시간 문자열에서 불필요한 공백 제거
  const normalizedUtcTimeStr = utcTimeStr?.replace(/\s+/g, "")

  // UTC 시간을 Date 객체로 변환 (UTC 기준)
  const utcDate = new Date(normalizedUtcTimeStr)

  if (isNaN(utcDate.getTime())) {
    // 날짜가 유효하지 않은 경우
    return "Invalid Date"
  }

  // 한국은 UTC+9임을 고려하여 밀리초 단위로 9시간을 추가
  const koreaTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)

  // 년, 월, 일, 시간, 분을 추출 (로컬 시간 기준)
  const year = koreaTime.getFullYear()
  const month = koreaTime.getMonth() + 1 // 월은 0부터 시작하므로 1을 더함
  const day = koreaTime.getDate()
  const hour = koreaTime.getHours()
  const minute = koreaTime.getMinutes()

  // "YYYY-MM-DD HH:mm" 형식으로 반환
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export function ktimeTrans2(utcTimeStr) {
  if (!utcTimeStr) {
    return ""
  }
  // 입력된 시간 문자열에서 불필요한 공백 제거
  const normalizedUtcTimeStr = utcTimeStr?.replace(/\s+/g, "")

  // UTC 시간을 Date 객체로 변환 (UTC 기준)
  const utcDate = new Date(normalizedUtcTimeStr)

  if (isNaN(utcDate.getTime())) {
    // 날짜가 유효하지 않은 경우
    return "Invalid Date"
  }

  // 한국은 UTC+9임을 고려하여 밀리초 단위로 9시간을 추가
  const koreaTime = new Date(utcDate.getTime() + 9 * 60 * 60 * 1000)

  // 년, 월, 일, 시간, 분을 추출 (로컬 시간 기준)
  const year = koreaTime.getFullYear()
  const month = koreaTime.getMonth() + 1 // 월은 0부터 시작하므로 1을 더함
  const day = koreaTime.getDate()
  const hour = koreaTime.getHours()
  const minute = koreaTime.getMinutes()

  // "YYYY-MM-DD HH:mm" 형식으로 반환
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}`
}

export function ktimeTransSecond(utcTimeStr) {
  // 입력된 시간 문자열에서 불필요한 공백 제거
  const normalizedUtcTimeStr = utcTimeStr?.replace(/\s+/g, "")

  // UTC 시간을 Date 객체로 변환 (UTC 기준)
  const utcDate = new Date(normalizedUtcTimeStr)

  if (isNaN(utcDate.getTime())) {
    // 날짜가 유효하지 않은 경우
    return "Invalid Date"
  }

  // 한국은 UTC+9임을 고려하여 밀리초 단위로 9시간을 추가
  const koreaTime = new Date(utcDate.getTime() + 60 * 60 * 1000)

  // 년, 월, 일, 시간, 분을 추출 (로컬 시간 기준)
  const year = koreaTime.getFullYear()
  const month = koreaTime.getMonth() + 1 // 월은 0부터 시작하므로 1을 더함
  const day = koreaTime.getDate()
  const hour = koreaTime.getHours()
  const minute = koreaTime.getMinutes()
  const second = koreaTime.getSeconds()
  // "YYYY-MM-DD HH:mm" 형식으로 반환
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second}`
}

export function ktimeTransThird(utcTimeStr) {
  // 입력된 시간 문자열이 정의되지 않았거나 null인 경우를 확인
  if (!utcTimeStr) {
    return "No Date Provided"
  }

  // 입력된 시간 문자열에서 불필요한 공백 제거 (Z는 유지)
  const normalizedUtcTimeStr = utcTimeStr.trim()

  // UTC 시간을 Date 객체로 변환 (ISO8601 포맷 지원)
  const utcDate = new Date(normalizedUtcTimeStr)

  if (isNaN(utcDate.getTime())) {
    // 날짜가 유효하지 않은 경우
    return "Invalid Date"
  }

  // 한국은 UTC+9임을 고려하여 밀리초 단위로 9시간을 추가
  const koreaTimeMillis = utcDate.getTime() + 9 * 60 * 60 * 1000
  const koreaTime = new Date(koreaTimeMillis)

  // 년, 월, 일, 시간, 분, 초를 추출 (한국 시간 기준)
  const year = koreaTime.getFullYear()
  const month = koreaTime.getMonth() + 1 // 월은 0부터 시작하므로 1을 더함
  const day = koreaTime.getDate()
  const hour = koreaTime.getHours()
  const minute = koreaTime.getMinutes()
  const second = koreaTime.getSeconds()

  // "YYYY-MM-DD HH:mm:ss" 형식으로 반환
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`
}
export function ktimeTransFour(utcTimeStr) {
  // 입력된 시간 문자열이 정의되지 않았거나 null인 경우를 확인
  if (!utcTimeStr) {
    return "No Date Provided"
  }

  // 입력된 시간 문자열에서 불필요한 공백 제거
  const normalizedUtcTimeStr = utcTimeStr.trim()

  // 밀리초를 포함하는 ISO 문자열을 지원하지 않는 환경을 위해 밀리초 제거
  const cleanedUtcTimeStr = normalizedUtcTimeStr.replace(/\.\d+/, "")

  // UTC 시간을 Date 객체로 변환
  const utcDate = new Date(cleanedUtcTimeStr)

  if (isNaN(utcDate.getTime())) {
    // 날짜가 유효하지 않은 경우
    return "Invalid Date"
  }

  // 한국은 UTC+9임을 고려하여 밀리초 단위로 9시간을 추가
  const koreaTimeMillis = utcDate.getTime() + 9 * 60 * 60 * 1000
  const koreaTime = new Date(koreaTimeMillis)

  // 년, 월, 일, 시간, 분, 초를 추출 (한국 시간 기준)
  const year = koreaTime.getFullYear()
  const month = koreaTime.getMonth() + 1 // 월은 0부터 시작하므로 1을 더함
  const day = koreaTime.getDate()
  const hour = koreaTime.getHours()
  const minute = koreaTime.getMinutes()
  const second = koreaTime.getSeconds()

  // "YYYY-MM-DD HH:mm:ss" 형식으로 반환
  return `${year}-${month.toString().padStart(2, "0")}-${day.toString().padStart(2, "0")} ${hour
    .toString()
    .padStart(2, "0")}:${minute.toString().padStart(2, "0")}:${second.toString().padStart(2, "0")}`
}

export function toKoreanTime(isoString) {
  // ISO 문자열로부터 Date 객체 생성
  const date = new Date(isoString)
  // UTC에 +9시간을 밀리초 단위로 더함 (9시간 * 60분 * 60초 * 1000밀리초)
  const koreanTime = new Date(date.getTime() + 9 * 60 * 60 * 1000)

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul",
    hour12: false,
  }

  // 변환된 시간을 'ko-KR' 로케일과 주어진 옵션을 사용하여 포맷팅
  return new Intl.DateTimeFormat("ko-KR", options).format(koreanTime)
}
export function toKoreanTimeNoAdd(isoString) {
  // ISO 문자열로부터 Date 객체 생성
  const date = new Date(isoString)
  // UTC에 +9시간을 밀리초 단위로 더함 (9시간 * 60분 * 60초 * 1000밀리초)

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZone: "Asia/Seoul",
    hour12: false,
  }

  // 변환된 시간을 'ko-KR' 로케일과 주어진 옵션을 사용하여 포맷팅
  return new Intl.DateTimeFormat("ko-KR", options).format(date)
}

/**
 * 2024-04-12 T 06:56:16 =>  2024-04-12  xx:56:16
 * @param {*} dateStr
 * @param {*} hoursToAdd
 * @returns
 */
export function ktimeTdeleteSecond(dateStr, hoursToAdd) {
  // 입력 문자열 유효성 검증
  if (!dateStr || typeof dateStr !== "string") {
    console.error("Invalid or empty date string provided.")
    return ""
  }

  // 공백 제거 및 'T'로 정확히 분리하기 위한 조정
  const cleanedDateStr = dateStr.trim().replace(/ /g, "").replace("T", "T")

  // Date 객체 생성
  const date = new Date(cleanedDateStr)

  // Date 객체의 유효성 검사
  if (isNaN(date.getTime())) {
    console.error("Invalid date:", cleanedDateStr)
    return ""
  }

  // 시간을 추가
  date.setHours(date.getHours() + hoursToAdd)

  // 날짜를 YYYY-MM-DD 형식으로 변환
  const year = date.getFullYear()
  const month = (date.getMonth() + 1).toString().padStart(2, "0")
  const day = date.getDate().toString().padStart(2, "0")

  // 시간을 HH:mm:ss 형식으로 변환
  const hours = date.getHours().toString().padStart(2, "0")
  const minutes = date.getMinutes().toString().padStart(2, "0")
  const seconds = date.getSeconds().toString().padStart(2, "0")

  // 최종 문자열 반환
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}
