/* eslint-disable*/

// 숫자에 콤마 붙이거나 빼거나하는 함수들

export function addCommasToNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function addCommasToNumber2(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "P";
}

export function removeCommasFromNumber(formattedNumber) {
  return formattedNumber.replace(/,/g, "").replace("원", "").replace("P", "");
}
