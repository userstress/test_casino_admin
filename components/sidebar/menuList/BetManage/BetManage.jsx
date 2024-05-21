import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

// 베팅관리 navbar
export default function BetManage() {
  const route = useRouter()
  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname === "/bettingManage/totalList" ? { color: "#FFA500" } : {}}
      >
        <Link href="/bettingManage/totalList">
          <a>베팅 내역 보기</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/bettingManage/betTransaction") ? { color: "#FFA500" } : {}}
      >
        <Link href="/bettingManage/betTransaction">
          <a> 베팅개별(기존) 내역보기</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/bettingManage/gameBetList") ? { color: "#FFA500" } : {}}
      >
        <Link href="/bettingManage/gameBetList">
          <a>게임별 베팅 내역 보기</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/bettingManage/adminCancle") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/bettingManage/adminCancle"}>
          <a>관리자 베팅취소 내역</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/bettingManage/userCancle") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/bettingManage/userCancle"}>
          <a>회원 베팅취소 내역</a>
        </Link>
      </li>
    </>
  )
}
