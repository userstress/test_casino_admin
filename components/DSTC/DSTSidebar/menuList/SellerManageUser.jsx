import { useRouter } from "next/router"
import Link from "next/link"

function SellerManageUser() {
  const route = useRouter()

  const RoutingMap = [
    { path: "/DST/infoes/usermanagement", name: "회원관리" },
    { path: "/DST/infoes/status", name: "회원 가입 현황" },
    { path: "/DST/infoes/sleepuser", name: "휴면 유저 관리" },
    { path: "/DST/infoes/blackList", name: "차단 & 탈퇴 회원 목록" },
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

export default SellerManageUser
