import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

function PrematchManagement() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/prematchManage/marketSettings") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/prematchManage/marketSettings"}>
          <a>마켓 설정</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/prematchManage/preMatchManagement") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/prematchManage/preMatchManagement"}>
          <a>프리매치 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/prematchManage/subscribeManage") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/prematchManage/subscribeManage"}>
          <a>프리매치 자동 구독 관리</a>
        </Link>
      </li>
    </>
  )
}

export default PrematchManagement
