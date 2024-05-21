// import Link from "next/link"
import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"

function CasinoManagement() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/casinoManagement/incomeList") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/casinoManagement/incomeList"}>
          <a>머니 전환 종합내역</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/casinoManagement/depositRequest") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/casinoManagement/depositRequest"}>스포츠머니 &rarr; 카지노머니 </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/casinoManagement/withdrawalRequest") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/casinoManagement/withdrawalRequest"}>카지노머니 &rarr; 스포츠머니</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/casinoManagement/ExchargeByDate") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/casinoManagement/ExchargeByDate"}>날짜별 현황 충환</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/casinoManagement/bettingLogs") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/casinoManagement/bettingLogs"}>카지노 베팅 로그</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/casinoManagement/slotBettingLogs") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/casinoManagement/slotBettingLogs"}>슬롯 베팅 로그</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/slotProfitList") ? { color: "#FFA500" } : {}}
        // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        <Link href={"/slotProfitList"}>슬롯 순이익 리스트</Link>
      </li>
      {/* <Link href={"/slotProfitList"}> */}
      {/* <a>베팅 로그 슬롯 순이익 리스트</a> */}
      {/* </Link> */}
    </>
  )
}

export default CasinoManagement
