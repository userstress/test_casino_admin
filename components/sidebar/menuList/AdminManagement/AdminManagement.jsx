// 자주쓰는 메뉴
import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function AdminManagement() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/managerTap/adminLoginHistory") ? { color: "#FFA500" } : {}}
      >
        <Link href="/managerTap/adminLoginHistory">
          <a>접속 로그</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/managerTap/adminActiveHistory") ? { color: "#FFA500" } : {}}
      >
        <Link href="/managerTap/adminActiveHistory">
          <a>활동 로그</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/managerTap/adminInfo") ? { color: "#FFA500" } : {}}
      >
        <Link href="/managerTap/adminInfo">
          <a>계정 설정</a>
        </Link>
      </li>
      <li className="sidebarSmallMenu" style={route.pathname.includes("/whiteIp") ? { color: "#FFA500" } : {}}>
        <Link href="/whiteIp">
          <a>화이트 아이피 설정</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/managerTap/alarmSetting") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        알람 사운드 설정
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/smsVerificationCount") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        SMS 인증 카운트
      </li>
    </>
  )
}
