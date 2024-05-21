import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function StatisticalManagement() {
  const route = useRouter()

  return (
    <>
      <Link href={"/statisticalManage/userLoginStatistics"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/userLoginStatistics") ? { color: "#FFA500" } : {}}
        >
          로그인 통계
        </li>
      </Link>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/hitRateUser") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        회원별 적중률
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/adminInfo") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/adminInfo"}>관리자 정보</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/adminIP") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/adminIP"}>관리자 IP</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/userIp") ? { color: "#FFA500" } : {}}
      >
        {" "}
        <Link href={"/statisticalManage/userIp"}>매장 관리 IP</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/siteSetting") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/siteSetting"}>사이트 설정</Link>
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/moneyExChangeSetting") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/moneyExChangeSetting"}> 충전/환전 관리</Link>
      </li>
      <Link href={"/statisticalManage/ExchargeByDate"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/ExchargeByDate") ? { color: "#FFA500" } : {}}
        >
          날짜별 충환 목록
        </li>
      </Link>
      {/* </Link> */}
      <Link href={"/statisticalManage/newLevelSetting"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/newLevelSetting") ? { color: "#FFA500" } : {}}
        >
          NEW 레벨 설정
        </li>
      </Link>

      <Link href={"/statisticalManage/dateBettingCondition"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/dateBettingCondition") ? { color: "#FFA500" } : {}}
        >
          날짜별 현황(NEW)
        </li>
      </Link>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/differenceStatistics") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/differenceStatistics"}>
          <a>차액 통계</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/DepositManagements") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/DepositManagements"}>계좌 차액 관리</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/timeDifferenceDepositWithdraw") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        시간차 충환
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/depositWithdrawalRanking") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/depositWithdrawalRanking"}>충환 순위</Link>
      </li>

      <Link href={"/statisticalManage/folderRate"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/folderRate") ? { color: "#FFA500" } : {}}
        >
          폴더별 손익 계산
        </li>
      </Link>

      <Link href={"/statisticalManage/typeBettingAll"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/typeBettingAll") ? { color: "#FFA500" } : {}}
        >
          타입별 베팅 현황[전체] [N]
        </li>
      </Link>

      <Link href={"/statisticalManage/typeBettingSports"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/typeBettingSports") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          타입별 베팅 현황[스포츠][N]
        </li>
      </Link>

      <Link href={"/statisticalManage/typeBettingGameZone"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/statisticalManage/typeBettingGameZone") ? { color: "#FFA500" } : {}}
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          타입별 베팅 현황[게임존][N]
        </li>
      </Link>

      <Link href={"/statisticalManage/typeBettingNewSunCity"}>
        <li
          className="sidebarSmallMenu"
          style={
            (route.pathname.includes("/statisticalManage/typeBettingNewSunCity") ? { color: "#FFA500" } : {},
            { fontSize: "90%" })
          }
          // onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
        >
          타입별 베팅 현황[뉴썬시티][N]
        </li>
      </Link>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/gameZoneBettingStatus") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        게임존 베팅 현황
      </li>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/bettingAnalysis") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/bettingAnalysis"}>베팅별 분석 </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/statisticalManage/statics") ? { color: "#FFA500" } : {}}
        onClick={() => toast.error("업데이트 예정인 페이지입니다. ( 9월 업데이트 예정 )")}
      >
        매출현황/ 계좌 차액 통계
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname == "/statisticalManage/accessStatistics" ? { color: "#FFA500" } : {}}
      >
        <Link href={"/statisticalManage/accessStatistics"}>
          <a>접속 통계</a>
        </Link>
      </li>
    </>
  )
}
