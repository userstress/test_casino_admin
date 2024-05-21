import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

function InplayManagement() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/InplayManage/marketSettings") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/InplayManage/marketSettings"}>
          <a>마켓 설정</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/InplayManage/inPlayManagement") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/InplayManage/inPlayManagement"}>
          <a>인플레이 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/InplayManage/subscribeManage") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/InplayManage/subscribeManage"}>
          <a>인플레이 자동 구독 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/InplayManage/inplayDelay") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/InplayManage/inplayDelay"}>인플레이 악성 시간제한</Link>
      </li>
    </>
  )
}

export default InplayManagement
