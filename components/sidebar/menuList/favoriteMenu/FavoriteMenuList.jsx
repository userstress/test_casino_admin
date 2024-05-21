// 자주쓰는 메뉴
import Link from "next/link"
import { useRouter } from "next/router"

export default function FavoriteMenuList() {
  const route = useRouter()

  return (
    <>
      <Link href={"/notice"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/notice") ? { color: "#FFA500" } : {}}>
          공지사항
        </li>
      </Link>
      <Link href={"/flowNotice"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/flowNotice") ? { color: "#FFA500" } : {}}>
          흐르는 공지
        </li>
      </Link>
      <Link href={"/board"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/board") ? { color: "#FFA500" } : {}}>
          게시판
        </li>
      </Link>
      <Link href={"/event"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/event") ? { color: "#FFA500" } : {}}>
          이벤트
        </li>
      </Link>
      <Link href={"/popup"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/popup") ? { color: "#FFA500" } : {}}>
          팝업
        </li>
      </Link>
      <Link href={"/mobilePopup"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/mobilePopup") ? { color: "#FFA500" } : {}}>
          모바일 팝업
        </li>
      </Link>
      <Link href={"/customerService"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/customerService") ? { color: "#FFA500" } : {}}
        >
          고객센터
        </li>
      </Link>
      <Link href={"/mainNotice"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/mainNotice") ? { color: "#FFA500" } : {}}>
          메인공지
        </li>
      </Link>
      <Link href={"/usedMoneyLog"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/usedMoneyLog") ? { color: "#FFA500" } : {}}>
          머니 사용 로그
        </li>
      </Link>
      <Link href={"/usedPointLog"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/usedPointLog") ? { color: "#FFA500" } : {}}>
          포인트 사용 기록
        </li>
      </Link>
      <Link href={"/noteManagement"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/noteManagement") ? { color: "#FFA500" } : {}}>
          쪽지 관리
        </li>
      </Link>
      <Link href={"/sportsGameMG"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/sportsGameMG") ? { color: "#FFA500" } : {}}>
          게임관리(스포츠)
        </li>
      </Link>
      <Link href={"/changePW"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/changePW") ? { color: "#FFA500" } : {}}>
          비밀번호 변경 신청
        </li>
      </Link>
      <Link href={"/incomeList"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/incomeList") ? { color: "#FFA500" } : {}}>
          매출현황/차액통계
        </li>
      </Link>
      <Link href={"/chargeEvents"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/chargeEvents") ? { color: "#FFA500" } : {}}>
          돌발 충전 이벤트
        </li>
      </Link>
      <Link href={"/alarms"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/alarms") ? { color: "#FFA500" } : {}}>
          알람사운드 설정
        </li>
      </Link>
      <Link href={"/statics"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/statics") ? { color: "#FFA500" } : {}}>
          매출현황/차액 관리
        </li>
      </Link>
      <Link href={"/whiteIp"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/whiteIp") ? { color: "#FFA500" } : {}}>
          화이트 아이피
        </li>
      </Link>
      <Link href={"/DST/manage/mainInfo"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/mainInfo") ? { color: "#FFA500" } : {}}>
          DST이동
        </li>
      </Link>
    </>
  )
}
