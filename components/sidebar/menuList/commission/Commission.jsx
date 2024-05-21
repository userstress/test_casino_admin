import Link from "next/link"
import { useRouter } from "next/router"

export default function Commission() {
  const route = useRouter()

  return (
    <>
      <li className="sidebarSmallMenu" style={route.pathname == "/Commition/commission" ? { color: "#FFA500" } : {}}>
        <Link href={"/Commition/commission"}>커미션 내역</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname == "/Commition/dailyCommission" ? { color: "#FFA500" } : {}}
      >
        <Link href={"/Commition/dailyCommission"}>커미션 내역(일일)</Link>
      </li>
    </>
  )
}
