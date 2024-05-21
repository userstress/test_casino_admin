/* eslint-disable*/

// 숫자에 콤마 붙이거나 빼거나하는 함수들

/**
 * 원
 * @param {*} number
 * @returns
 */
export function addCommasToNumber(number) {
  // 입력값이 null이나 undefined이거나, 숫자로 변환될 수 없다면 빈 문자열을 반환
  if (number === null || number === undefined || isNaN(Number(number))) {
    return ""
  }

  // 입력값이 숫자라면 문자열로 변환
  const numStr = number.toString()

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 원"
}

/**
 * 포인트
 * @param {*} number
 * @returns
 */
export function addCommasToNumber2(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " P"
}

export function removeCommasFromNumber(formattedNumber) {
  return formattedNumber.replace(/,/g, "").replace("원", "").replace("P", "")
}
export function addCommasToNumber3(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

/**
 * 원화변환
 * @param {*} number
 * @returns
 */
export function currencyFormatter(number) {
  return new Intl.NumberFormat("ko-KR", {
    style: "decimal",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number)
}

/**
 * 동
 * @param {*} number
 * @returns
 */

export function addCommasToNumberDong(number) {
  // 입력값이 null이나 undefined이거나, 숫자로 변환될 수 없다면 빈 문자열을 반환
  if (number === null || number === undefined || isNaN(Number(number))) {
    return ""
  }

  // 입력값이 숫자라면 문자열로 변환
  const numStr = number.toString()

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " 동"
}

/**
 * 단위없음 3자리마다 ,
 * @param {*} number
 * @returns
 */
export function addCommasToNumberFree(number) {
  // 입력값이 null이나 undefined이거나, 숫자로 변환될 수 없다면 빈 문자열을 반환
  if (number === null || number === undefined || isNaN(Number(number))) {
    return ""
  }

  // 입력값이 숫자라면 문자열로 변환
  const numStr = number.toString()

  return numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

export function addCommasToNumberCasino(number) {
  // 입력값이 null이나 undefined이거나, 숫자로 변환될 수 없다면 빈 문자열을 반환
  if (number === null || number === undefined || isNaN(Number(number))) {
    return ""
  }

  // 숫자 문자열에서 왼쪽 끝의 0을 제거
  const numStr = number.toString().replace(/^0+/, "")

  // 제거된 결과가 빈 문자열이라면 0으로 설정
  if (numStr === "") {
    return "0 원"
  }

  // 콤마 추가
  const formattedNumber = numStr.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  return formattedNumber + " 원"
}
