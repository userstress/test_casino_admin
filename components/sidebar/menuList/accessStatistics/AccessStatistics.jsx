import Link from "next/link"
import { useRouter } from "next/router"

export default function AccessStatistics() {
  const route = useRouter()

  return (
    <>
      <li className="sidebarSmallMenu" style={route.pathname == "/accessStatistics" ? { color: "#FFA500" } : {}}>
        <Link href={"/accessStatistics"}>
          <a>접속 통계</a>
        </Link>
      </li>
    </>
  )
}
