// import Link from "next/link"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"

function SportResult() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/sportsMatchResult/gameResultRegistration") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/sportsMatchResult/gameResultRegistration"}>게임 결과 등록</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/sportsMatchResult/matchResultList") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        정산확인
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/sportsMatchResult/resultFix") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/sportsMatchResult/resultFix"}>결과 수정</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/sportsMatchResult/gameManageManual") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/sportsMatchResult/gameManageManual"}>게임관리(수동)</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        // style={route.pathname.includes("/modifyResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        게임관리(미정산 경기)
      </li>
      <li
        className="sidebarSmallMenu"
        // style={route.pathname.includes("/modifyResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. (9월 업데이트 예정 )")}
      >
        게임관리(재정산 경기)
      </li>

      <li
        className="sidebarSmallMenu"
        // style={route.pathname.includes("/modifyResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        게임관리(팀변경)
      </li>

      <li
        className="sidebarSmallMenu"
        // style={route.pathname.includes("/modifyResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        게임관리(골취소)
      </li>

      <Link href={"/gameSettlementConfirmation"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/gameSettlementConfirmation") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          인/프 정산확인
        </li>
      </Link>
    </>
  )
}

export default SportResult
