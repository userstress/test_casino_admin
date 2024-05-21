import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function LuckyEvent() {
  const route = useRouter()

  return (
    <>
      <Link href={"/luckyPointSetting"}>
        <li className="sidebarSmallMenu" style={route.pathname == "/luckyPointSetting" ? { color: "#FFA500" } : {}}>
          럭키 포인트 세팅
        </li>
      </Link>
      <Link href={"/attendanceCheck"}>
        <li className="sidebarSmallMenu" style={route.pathname == "/attendanceCheck" ? { color: "#FFA500" } : {}}>
          출석 체크
        </li>
      </Link>
      <Link href={"/attendanceCheckTypeC"}>
        <li className="sidebarSmallMenu" style={route.pathname == "/attendanceCheckTypeC" ? { color: "#FFA500" } : {}}>
          출석 체크 C타입
        </li>
      </Link>
      {/* <Link href={"/attendanceCheckTypeC2"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname == "/attendanceCheckTypeC2" ? { color: "#FFA500" } : { fontSize: "12px" }}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        특수 이벤트/ 돌발 (시간) 충전 이벤트
      </li>
      {/* </Link> */}
      <Link href={"/roulletteLog"}>
        <li className="sidebarSmallMenu" style={route.pathname == "/roulletteLog" ? { color: "#FFA500" } : {}}>
          돌림판 로그
        </li>
      </Link>
      <Link href={"/buyLog"}>
        <li className="sidebarSmallMenu" style={route.pathname == "/buyLog" ? { color: "#FFA500" } : {}}>
          상점 구매 로그
        </li>
      </Link>
      <Link href={"/expiredCouponLog"}>
        <li className="sidebarSmallMenu" style={route.pathname == "/expiredCouponLog" ? { color: "#FFA500" } : {}}>
          소멸 쿠폰 로그
        </li>
      </Link>
      <Link href={"/luckyPointLog"}>
        <li className="sidebarSmallMenu" style={route.pathname == "/luckyPointLog" ? { color: "#FFA500" } : {}}>
          행운 복권 지급 리스트
        </li>
      </Link>
      {/* <Link href={"/luckyPointLog1"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname == "/luckyPointLog1" ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        콤프/롤링 이벤트
      </li>
      {/* </Link> */}
      {/* <Link href={"/luckyPointLog2"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname == "/luckyPointLog2" ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        슬롯 롤링 이벤트
      </li>
      {/* </Link> */}
    </>
  )
}
