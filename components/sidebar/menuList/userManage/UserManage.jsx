import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function UserManage(props) {
  const router = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/userRegister") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/userRegister"}>
          <a>회원등록</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoSportsNew") ? { color: "#FFA500" } : {}}
      >
        추천인 코드 관리
      </li>
      <li className="sidebarSmallMenu" style={router.pathname == "/UserManage/userInfo" ? { color: "#FFA500" } : {}}>
        <Link href={"/UserManage/userInfo"}>
          <a>회원정보</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/userInfoTotal") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/userInfoTotal"}>
          <a>회원정보(종합)</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoSportsNew") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(스포츠_NEW)
      </li>

      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoSportsRealtime") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(스포츠_실시간)
      </li>

      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoSportsOverseas") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(스포츠_해외배당)
      </li>
      {/* <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoGameZone") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(게임존)
      </li> */}
      {/* <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoAnimePlus") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(애니플러스)
      </li> */}
      {/* <li
        className="sidebarSmallMenu"
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        style={router.pathname.includes("/userInfoSunCity") ? { color: "#FFA500" } : {}}
      >
        회원정보(썬시티)
      </li> */}
      {/* <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoCasino") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(카지노)
      </li> */}
      {/* </Link> */}
      {/* <Link href={"/userInfoTokenGame"}> */}
      {/* <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoTokenGame") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(토큰게임)
      </li> */}
      {/* </Link> */}
      {/* <Link href={"/userInfoHoldem"}> */}
      {/* <li
        className="sidebarSmallMenu"
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        style={router.pathname.includes("/userInfoHoldem") ? { color: "#FFA500" } : {}}
      >
        회원정보(홀덤)
      </li> */}
      {/* </Link> */}
      {/* <Link href={"/userInfoBaduk"}> */}
      {/* <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userInfoBaduk") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정보(바둑이)
      </li> */}
      {/* </Link> */}
      {/* <Link href={"/userManagementLogin"}> */}
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userManagementLogin") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정리 시스템(로그인)
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/userManagementCharge") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원정리 시스템(충전)
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/userInfoChangeLog") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/userInfoChangeLog"}>회원정보 변경 로그</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/userLoginHistory") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/userLoginHistory"}>
          <a>로그인 시도</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/userLoginDetail") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/userLoginDetail"}>로그인 정보</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/userLoginCounts") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/userLoginCounts"}>회원 로그인 횟수</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/changePW") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/changePW"}>비밀번호 변경 신청</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/statisticalManage/userLoginStatistics") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        로그인 통계
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/pwask") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/pwask"}>
          <a>비밀번호 문의</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/blockIp") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/blockIp"}>
          <a>IP 블럭 정보</a>
        </Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/CurrentUser") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/CurrentUser"}>현재 접속자&쪽지</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/LevelExpManage") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/LevelExpManage"}>경험치 EXP관리</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/LevelExpList") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/LevelExpList"}>경험치 EXP 이력</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={router.pathname.includes("/UserManage/LevelExpPromote") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/UserManage/LevelExpPromote"}>경험치 승급 대상자</Link>
      </li>
      <Link href={"/withdrawalUserInfo"}>
        <li
          className="sidebarSmallMenu"
          style={router.pathname.includes("/withdrawalUserInfo") ? { color: "#FFA500" } : {}}
        >
          탈퇴 회원 정보
        </li>
      </Link>
    </>
  )
}
