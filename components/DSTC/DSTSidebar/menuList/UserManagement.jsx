import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function UserManagement() {
  const route = useRouter()

  const RoutingMap = [
    { path: "/DST/userManagement/userList", name: "회원목록" },
    { path: "/DST/userManagement/partner", name: "파트너" },
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

export default UserManagement
