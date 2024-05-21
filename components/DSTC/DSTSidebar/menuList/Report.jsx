import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function Report() {
  const route = useRouter()

  const RoutingMap = [
    { path: "/DST/report/deposit", name: "입금내역" },
    { path: "/DST/report/withdraw", name: "출금내역" },
    { path: "/DST/report/recallList", name: "지급 회수 내역" },
    { path: "/DST/report/integrated", name: "통합정산" },
  ]

  return (
    <div>
      {RoutingMap.map((arr) => {
        return (
          <li style={route.pathname == arr.path ? { color: "#FFA500" } : {}}>
            <Link href={arr.path}>
              <a>{arr.name}</a>
            </Link>
          </li>
        )
      })}
    </div>
  )
}

export default Report
