import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function Community() {
  const route = useRouter()

  const RoutingMap = [
    { path: "/DST/community/cs", name: "고객문의" },
    { path: "/DST/community/userNotice", name: "공지 (유저)" },
    { path: "/DST/community/parterNotice", name: "공지 (파트너)" },
    { path: "/DST/community/message", name: "쪽지" },
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

export default Community
