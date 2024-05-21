import ParsNumPrice from "./parseNumPrice"

const FOLDER_3 = 1.03 // 3폴 이벤트 배당
const FOLDER_5 = 1.05 // 5폴 이벤트 배당
const FOLDER_7 = 1.07 // 7폴 이벤트 배당

/**
 *  다폴더 이벤트 적용시 해당되는 이벤트 배당을 적용하고 그렇지 않다면 그대로 리턴하는 함수
 *
 * @param {string} betFoldType 3폴,5폴,7폴에 대한 서버로부터 받은 문자열 값
 * @param {number} totalBetPrice 이벤트 배당 제외한 모든 배당 곱연산한 값
 * @return {number} 각 폴에 해당되는 배당과 totalBetPrice 곱한 값
 */

export function calculateTotalBetPrice(betFoldType, totalBetPrice) {
  if (!betFoldType || betFoldType === "SINGLE_FOLDER") {
    // 이벤트 배당 적용 안될때
    return ParsNumPrice(totalBetPrice)
  }
  switch (betFoldType) {
    case "THREE_FOLDER":
      return FOLDER_3
    case "FIVE_FOLDER":
      return FOLDER_5
    case "SEVEN_FOLDER":
      return FOLDER_7
  }
}

/**
 *  베팅내역의 이벤트 배당 적용시 랜더링 위한 함수
 *
 * @param {string} betFoldType 3폴,5폴,7폴에 대한 서버로부터 받은 문자열 값
 * @return {any} 1,2폴일때는 false 리턴 나머지는 이벤트 컬럼 랜더링 위한 객체 리턴
 */

export function isSetEventBetPrice(betFoldType) {
  if (!betFoldType || betFoldType === "SINGLE_FOLDER") {
    return false
  }
  switch (betFoldType) {
    case "THREE_FOLDER":
      return {
        text: "3폴더 이상",
        betPrice: FOLDER_3,
      }
    case "FIVE_FOLDER":
      return {
        text: "5폴더 이상",
        betPrice: FOLDER_5,
      }
    case "SEVEN_FOLDER":
      return {
        text: "7폴더 이상",
        betPrice: FOLDER_7,
      }
  }
}
