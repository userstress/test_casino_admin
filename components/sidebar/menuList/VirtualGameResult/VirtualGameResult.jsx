// import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"

function VirtualGameResult() {
  const route = useRouter()

  return (
    <>
      {/* <Link href={"/virtualSoccerResult"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/virtualSoccerResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        가상 축구 결과
      </li>
      {/* </Link> */}

      {/* <Link href={"/virtualBasketBallResult"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/virtualBasketBallResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        가상 농구 결과
      </li>
      {/* </Link> */}

      {/* <Link href={"/virtualTennisResult"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/virtualTennisResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        가상 테니스 결과
      </li>
      {/* </Link> */}

      {/* <Link href={"/virtualDartsResult"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/virtualDartsResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        가상 다트 결과
      </li>
      {/* </Link> */}

      {/* <Link href={"/virtualGreyhoundResult"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/virtualGreyhoundResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        가상 개경주 결과
      </li>
      {/* </Link> */}

      {/* <Link href={"/virtualHorseRacingResult"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/virtualHorseRacingResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        가상 경마 결과
      </li>
      {/* </Link> */}

      {/* <Link href={"/virtualCyclingResult"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/virtualCyclingResult") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        가상 경륜 결과
      </li>
      {/* </Link> */}
    </>
  )
}

export default VirtualGameResult
