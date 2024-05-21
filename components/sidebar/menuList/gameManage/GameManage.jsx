import Link from "next/link"
import { useRouter } from "next/router"

// 게임관리
export default function GameManage() {
  const route = useRouter()
  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname === "/GameManage/gameManagement" ? { color: "#FFA500" } : {}}
      >
        <Link href={"/GameManage/gameManagement"}>
          <a>게임 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/GameManage/gameManagementManual") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/GameManage/gameManagementManual"}>
          <a>게임관리(수동)</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/GameManage/gameManagementUnpaid") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/GameManage/gameManagementUnpaid"}>
          <a>게임관리(미정산 경기)(O)</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/GameManage/gameManagementRepaid") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/GameManage/gameManagementRepaid"}>
          <a>게임관리(재정산 경기)(O)</a>{" "}
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/GameManage/teamChange") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/GameManage/teamChange"}>
          <a>게임관리(팀변경)(O)</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/GameManage/cancledGoal") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/GameManage/cancledGoal"}>
          <a>게임관리(골취소)(O)</a>{" "}
        </Link>
      </li>

      <Link href={"/GameManage/bettingList"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname === "/GameManage/bettingList" ? { color: "#FFA500" } : {}}
        >
          <a>베팅 리스트</a>
        </li>
      </Link>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/GameManage/bettingListWarning") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/GameManage/bettingListWarning"}>
          <a>주시 베팅 리스트</a>
        </Link>
      </li>
    </>
  )
}
