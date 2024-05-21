import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function SellerInfo() {
  const route = useRouter()
  const RoutingMap = [
    { path: "/DST/manage/mainInfo", name: "총판정보" },
    { path: "/DST/manage/password", name: "비밀번호 변경" },
    { path: "/DST/manage/notes", name: "쪽지" },
    { path: "/DST/manage/notice", name: "공지사항" },
  ]
  return (
    <div>
      {RoutingMap.map((arr) => {
        return (
          <li style={route.pathname == "/statisticalManage/accessStatistics" ? { color: "#FFA500" } : {}}>
            <Link href={arr.path}>
              <a>{arr.name}</a>
            </Link>
          </li>
        )
      })}
    </div>
  )
}

export default SellerInfo
