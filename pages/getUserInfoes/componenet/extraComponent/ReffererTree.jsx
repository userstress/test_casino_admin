import React from "react"
import { ktimeTdeleteSecond } from "@utils/ktimetrans"

function ReffererTree({ referrerInfo }) {
  // referrerInfo가 배열인지 객체인지 판단하는 함수
  const isObject = (data) => data !== null && typeof data === "object" && !Array.isArray(data)

  const formatDateTime = (input) => {
    // 'T'를 공백(' ')으로 교체하고, 소수점 이후 6자리를 삭제합니다.
    return input.replace("T", " ").replace(/\.\d+/, "")
  }

  // JSX로 정보를 출력하는 함수
  const renderInfo = (info) => {
    if (Array.isArray(info)) {
      // referrerInfo가 배열일 경우
      return info.map((item, index) => (
        <li key={index}>
          상위 아이디 : `{item.username} ({item.nickname})` 상태 : {item.status} - {item.userGubunEnum} -{" "}
          {formatDateTime(item.createdAt)}
        </li>
      ))
    } else if (isObject(info)) {
      // referrerInfo가 객체일 경우
      return (
        <li>
          상위 아이디 : {info.username} ({info.nickname}) 상태 : {info.status} - {info.userGubunEnum} - &nbsp;
          {formatDateTime(info.createdAt)}
        </li>
      )
    } else {
      // referrerInfo가 유효한 객체 또는 배열이 아닐 경우
      return <li>없음</li>
    }
  }

  return renderInfo(referrerInfo)
}

export default ReffererTree
