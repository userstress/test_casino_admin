import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"

function AllMatchManagement() {
  const route = useRouter()

  return (
    <>
      <Link href={"/matchManagement/pendingGameList"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/matchManagement/pendingGameList") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          등록 대기 게임 리스트
        </li>
      </Link>

      <Link href={"/matchManagement/manualInProgressGameManagement"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/matchManagement/manualInProgressGameManagement") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          진행중 게임관리(수동)
        </li>
      </Link>

      <Link href={"/matchManagement/manualClosedGameManagement"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/matchManagement/manualClosedGameManagement") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          마감된 게임관리(수동)
        </li>
      </Link>

      {/* <Link href={"/matchManagement/autoInProgressGameManagement"}> */}
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/matchManagement/autoInProgressGameManagement") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        진행중 게임관리(자동)
      </li>
      {/* </Link> */}

      <Link href={"/matchManagement/autoClosedGameManagement"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/matchManagement/autoClosedGameManagement") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          마감된 게임관리(자동)
        </li>
      </Link>

      <Link href={"/matchManagement/allInProgressGameManagement"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/matchManagement/allInProgressGameManagement") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          진행중 게임관리(전체)
        </li>
      </Link>

      <Link href={"/matchManagement/allClosedGameManagement"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/matchManagement/allClosedGameManagement") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          마감된 게임관리(전체)
        </li>
      </Link>
    </>
  )
}

export default AllMatchManagement
