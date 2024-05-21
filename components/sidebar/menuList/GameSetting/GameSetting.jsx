// import Link from "next/link"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"

function GameSetting() {
  const route = useRouter()

  return (
    <>
      <Link href={"/crossBettingSettings"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/crossBettingSettings") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          크로스 베팅 설정
        </li>
      </Link>

      <Link href={"/footballCrossBettingSettings"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/footballCrossBettingSettings") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          축구 크로스 베팅 설정
        </li>
      </Link>

      <Link href={"/gameSettings"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/gameSettings") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          게임별 설정
        </li>
      </Link>

      <Link href={"/gameEventSettings"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/gameEventSettings") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          게임 이벤트 설정
        </li>
      </Link>

      <Link href={"/minigameOddsSettings"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/minigameOddsSettings") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          파워볼 배당률 설정
        </li>
      </Link>
    </>
  )
}

export default GameSetting
