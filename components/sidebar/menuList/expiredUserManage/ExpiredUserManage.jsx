// 탈퇴 회원 관리

import Link from "next/link"
import { useRouter } from "next/router"

export default function ExpiredUserManage(props) {
  const route = useRouter()
  return (
    <>
      <li className="sidebarSmallMenu" style={route.pathname === "/expiredUserInfo" ? { color: "#FFA500" } : {}}>
        <Link href={"/expiredUserInfo"}>
          <a>탈퇴 회원 정보</a>
        </Link>
      </li>

      {/* <Link href={"/expiredUserInfoAll"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/expiredUserInfoAll") ? { color: "#FFA500" } : {}}
        >
          탈퇴 회원 정보(종합)
        </li>
      </Link> */}
    </>
  )
}
