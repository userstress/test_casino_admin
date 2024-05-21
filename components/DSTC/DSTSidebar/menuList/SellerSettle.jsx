import React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function SellerInfo() {
  const route = useRouter()
  const RoutingMap = [
    { path: "/DST/settle/settleinfo", name: "회원별 정산" },
    { path: "/DST/settle/search", name: "날짜별 정산 조회" },
    { path: "/DST/settle/searchDay", name: "일별 정산 조회" },
    { path: "/DST/settle/searchList", name: "정산 내역 조회" },
    { path: "/DST/settle/casinoList", name: "카지노 베팅내역 조회" },
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
