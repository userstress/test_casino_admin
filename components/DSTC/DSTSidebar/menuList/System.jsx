import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function System() {
  const route = useRouter()

  const RoutingMap = [
    { path: "/DST/system/popupNotice", name: "팝업공지" },
    { path: "/DST/system/bonusAnnounce", name: "보너스 및 계좌안내" },
    { path: "/DST/system/log", name: "시스템 로그" },
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

export default System
