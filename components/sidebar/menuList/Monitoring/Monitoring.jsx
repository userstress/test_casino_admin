// import Link from "next/link"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"

function Monitoring() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/monitoring/bettingMonitoring") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/monitoring/bettingMonitoring"}>스포츠 모니터링</Link>
      </li>

      <Link href={"/miniGameResultMonitoring"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/miniGameResultMonitoring") ? { color: "#FFA500" } : {}}
          onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          미니게임 결과 모니터링
        </li>
      </Link>
    </>
  )
}

export default Monitoring
