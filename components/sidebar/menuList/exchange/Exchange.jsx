import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function Exchange() {
  const route = useRouter()
  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/chargeReg") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/Exchange/chargeReg"}>
          <a>충전 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/exchangeReg") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/Exchange/exchangeReg"}>
          <a> 환전 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/allMoneyHistroy") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/Exchange/allMoneyHistroy"}>
          <a>충/환전 전체 내역</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/depositCal") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/Exchange/depositCal"}>
          <a>입금 정산</a>
        </Link>
      </li>

      <li className="sidebarSmallMenu" style={route.pathname.includes("/withdrawCal") ? { color: "#FFA500" } : {}}>
        <Link href={"/Exchange/withdrawCal"}>
          <a> 출금 정산</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/usedMoneyLog") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/Exchange/usedMoneyLog"}>머니 사용 로그</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/usedPointLog") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        <Link href={"/Exchange/usedPointLog"}>
          <a>포인트 사용 기록</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/couponLog") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ")}
      >
        쿠폰 지급 정보
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/simpleAccountClickAnswerSettings") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ")}
      >
        매크로 설정
      </li>

      {/* <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/Exchange/coinAutoChargeTargetList") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        코인 자동 충전 대상 목록
      </li> */}

      <Link href={"/AutoCharge/storeMessage"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/AutoCharge/storeMessage") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          자동 충전 대상 목록
        </li>
      </Link>

      {/* <Link href={"/autoChargeSettings"}> */}
      {/* <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/autoChargeSettings") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        자동 충전 설정
      </li> */}
      {/* </Link> */}

      {/* <Link href={"/autoChargePhoneStatus"}> */}
      {/* <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/autoChargePhoneStatus") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        자동 충전 폰 상태
      </li> */}
      {/* </Link> */}

      {/* 140 충/환 자동승인계좌 */}

      {/* <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/AutoCharge/autoChargeList") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        자동승인계좌
      </li> */}

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/AutoCharge/receiveList") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/AutoCharge/receiveList"}>
          <a>문자 수신 목록</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/AutoCharge/messageControll") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/AutoCharge/messageControll"}>
          <a>문자 입금 정산</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/AutoCharge/storeMessage") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/AutoCharge/storeMessage"}>
          <a>알림 그룹 설정</a>
        </Link>
      </li>
    </>
  )
}
