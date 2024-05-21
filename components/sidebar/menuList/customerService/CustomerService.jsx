import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function CustomerService() {
  const route = useRouter()

  return (
    <>
      <li className="sidebarSmallMenu" style={route.pathname.includes("/customer/notice") ? { color: "#FFA500" } : {}}>
        <Link href={"/customer/notice"}>공지사항</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/customer/flowNotice") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/customer/flowNotice"}> 흐르는 공지</Link>
      </li>
      <Link href={"/customer/event"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/customer/event") ? { color: "#FFA500" } : {}}>
          이벤트
        </li>
      </Link>
      <Link href={"/customer/popup"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/popup") ? { color: "#FFA500" } : {}}>
          팝업
        </li>
      </Link>
      <Link href={"/customer/mobilePopup"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/mobilePopup") ? { color: "#FFA500" } : {}}>
          모바일 팝업
        </li>
      </Link>
      <Link href={"/customer/board"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/board") ? { color: "#FFA500" } : {}}>
          게시판
        </li>
      </Link>
      <Link href={"/customer/customerService"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname == "/customer/customerService" ? { color: "#FFA500" } : {}}
        >
          고객센터
        </li>
      </Link>
      <Link href={"/customer/customerServiceTemplate"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname == "/customer/customerServiceTemplate" ? { color: "#FFA500" } : {}}
        >
          고객센터 템플릿
        </li>
      </Link>
      <Link href={"/customer/moneyTemplate"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname == "/customer/moneyTemplate" ? { color: "#FFA500" } : {}}
        >
          머니 템플릿
        </li>
      </Link>
      <Link href={"/customer/pointTemplate"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname == "/customer/pointTemplate" ? { color: "#FFA500" } : {}}
        >
          포인트 템플릿
        </li>
      </Link>
      <Link href={"/customer/noteManagement"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/customer/noteManagement") ? { color: "#FFA500" } : {}}
        >
          쪽지 관리
        </li>
      </Link>
      <li>모바일 푸시</li>
      <li>모바일 푸시 관리</li>
      <li>텔레그램 FAQ</li>
      <li>텔레그램 보내기</li>
    </>
  )
}
