import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function BetList() {
  const route = useRouter()

  const RoutingMap = [
    { path: "/DST/betList/slot", name: "슬롯" },
    { path: "/DST/betList/casino", name: "카지노" },
  ]

  return (
    <div>
      {RoutingMap.map((arr) => {
        return (
          <Link href={arr.path}>
            <li style={route.pathname == arr.path ? { color: "#FFA500" } : {}}>{arr.name}</li>
          </Link>
        )
      })}
    </div>
  )
}

export default BetList
