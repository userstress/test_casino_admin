import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function Rolling() {
  const route = useRouter()

  return (
    <>
      <li className="sidebarSmallMenu" style={route.pathname == "/Rolling/rollingList" ? { color: "#FFA500" } : {}}>
        <Link href={"/Rolling/rollingList"}>
          <a>롤링 내역</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname == "/Rolling/RollingPointHistory" ? { color: "#FFA500" } : {}}
      >
        <Link href={"/Rolling/RollingPointHistory"}>
          <a>롤링 포인트 내역</a>
        </Link>
      </li>
    </>
  )
}
