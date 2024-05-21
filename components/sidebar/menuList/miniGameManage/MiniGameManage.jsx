// 미니게임 관리

import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function MiniGameManage() {
  const route = useRouter()
  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname === "/typeManagement" ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        종목관리
        {/* <Link href={"/typeManagement"}>종목관리</Link> */}
      </li>

      <Link href={"/leagueManagement"}>
        <li className="sidebarSmallMenu" style={route.pathname === "/leagueManagement" ? { color: "#FFA500" } : {}}>
          리그관리
        </li>
      </Link>
      {/* <Link href={"/gameManagement"}> */}
      <li
        className="sidebarSmallMenu"
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        style={route.pathname === "/gameManagement" ? { color: "#FFA500" } : {}}
      >
        게임관리
      </li>
      {/* </Link> */}
      {/* <Link href={"/bettingList"}> */}
      <li
        className="sidebarSmallMenu"
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        style={route.pathname === "/bettingList" ? { color: "#FFA500" } : {}}
      >
        베팅 리스트
      </li>
      {/* </Link> */}
      {/* <Link href={"/bettingListWarning"}> */}
      <li
        className="sidebarSmallMenu"
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        style={route.pathname.includes("/bettingListWarning") ? { color: "#FFA500" } : {}}
      >
        주시 베팅 리스트
      </li>
      {/* </Link> */}
    </>
  )
}
