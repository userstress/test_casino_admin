import React, { useState } from "react"
import styles from "./Sidebar.module.css"
import MenuList from "./menuList/MenuList"
import CustomerService from "./menuList/customerService/CustomerService"
import Exchange from "./menuList/exchange/Exchange"
import LuckyEvent from "./menuList/luckyEvent/LuckyEvent"
import MiniGameManage from "./menuList/miniGameManage/MiniGameManage"
import Rolling from "./menuList/rolling/Rolling"
import StatisticalManagement from "./menuList/statisticalManagement/StatisticalManagement"
import StoreManagement from "./menuList/storeManagement/StoreManagement"
import UserManage from "./menuList/userManage/UserManage"
import BetManage from "./menuList/BetManage/BetManage"
import InplayManagement from "./menuList/InplayManagement/InplayManagement"
import PrematchManagement from "./menuList/PrematchManagement/PrematchManagement"
import InplayPrematchManagement from "./menuList/InplayPrematchManagement/InplayPrematchManagement"
import AllMatchManagement from "./menuList/AllMatchManagement/AllMatchManagement"
import SportResult from "./menuList/sportResult/SportResult"
import VirtualGameResult from "./menuList/VirtualGameResult/VirtualGameResult"
import CasinoManagement from "./menuList/CasinoManagement/CasinoManagement"
import GameSetting from "./menuList/GameSetting/GameSetting"
import Monitoring from "./menuList/Monitoring/Monitoring"
import AdminManagement from "./menuList/AdminManagement/AdminManagement"
import CurrentStatusList from "./currentStatusList/CurrentStatusList"
import { useAuthStore } from "@utils/useAuthStore"
import AccessStatistics from "./menuList/accessStatistics/AccessStatistics"
import { useUserDetailStore } from "@utils/useUserDetailStore"
import { toast } from "react-toastify"
import FavoriteMenuList from "./menuList/favoriteMenu/FavoriteMenuList"

const SITENAME = process.env.NEXT_PUBLIC_SITE_NAME

export default function Sidebar() {
  const { logout } = useAuthStore()
  const { removeUserData } = useUserDetailStore()

  const menuIcon = (
    <svg width="0.729vw" height="0.625vw" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="#ffa500" />
    </svg>
  )

  const reverseIcon = (
    <svg width="0.729vw" height="0.625vw" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0L13.9282 12H0.0717969L7 0Z" fill="#ffa500" />
    </svg>
  )

  const [showSubMenuList, setShowSubMenuList] = useState({})

  const toggleSubMenu = (menuTab) => {
    // 현재 메뉴의 상태를 토글
    setShowSubMenuList((prevState) => ({
      ...prevState,
      [menuTab]: !prevState[menuTab],
    }))
  }

  function handleLogout() {
    logout()
    removeUserData()
    const cookies = document.cookie.split(";")

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/"
    }

    // 로컬 스토리지 비우기
    localStorage.clear()
    sessionStorage.clear()

    // toast("로그아웃", { onclose: () => window.location.assign("/") })
  }
  return (
    <div className={styles.sidebar}>
      {/* 자주쓰는 메뉴 */}
      <section className={styles.titleWrapper}>
        <title className={styles.companyName} onClick={() => window.location.assign("/")}>
          {SITENAME || ""}
        </title>
        <title className={styles.companyName}>게임관리</title>
      </section>
      <div>
        <CurrentStatusList />
      </div>
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 1 && styles.isOpened}`}
        onClick={() => toggleSubMenu(1)}
      >
        <div className={styles.sidebarMenuLabel}>즐겨찾기</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 1 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 1} component={<FavoriteMenuList />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[2] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(2)}
      >
        <div className={styles.sidebarMenuLabel}>회원관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[2] ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      <MenuList showMenu={showSubMenuList[2]} component={<UserManage />} />
      {/* 탈퇴 회원 관리 */}
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[3] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(3)}
      >
        <div className={styles.sidebarMenuLabel}>베팅관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[3] ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      <MenuList showMenu={showSubMenuList[3]} component={<BetManage />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[4] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(4)}
      >
        <div className={styles.sidebarMenuLabel}>인플레이 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[4] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[4]} component={<InplayManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[5] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(5)}
      >
        <div className={styles.sidebarMenuLabel}>프리매치 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[5] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[5]} component={<PrematchManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[6] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(6)}
      >
        <div className={styles.sidebarMenuLabel}>인플레이+프리매치 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[6] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[6]} component={<InplayPrematchManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[7] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(7)}
      >
        <div className={styles.sidebarMenuLabel}>전체 경기 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[7] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[7]} component={<AllMatchManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[8] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(8)}
      >
        <div className={styles.sidebarMenuLabel}>스포츠 경기 결과</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[8] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[8]} component={<SportResult />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[9] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(9)}
      >
        <div className={styles.sidebarMenuLabel}>가상게임 결과</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[9] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[9]} component={<VirtualGameResult />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[10] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(10)}
      >
        <div className={styles.sidebarMenuLabel}>카지노 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[10] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[10]} component={<CasinoManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[11] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(11)}
      >
        <div className={styles.sidebarMenuLabel}>게임설정</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[11] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[11]} component={<GameSetting />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[12] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(12)}
      >
        <div className={styles.sidebarMenuLabel}>미니게임 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[12] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[12]} component={<MiniGameManage />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[13] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(13)}
      >
        <div className={styles.sidebarMenuLabel}>모니터링</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[13] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[13]} component={<Monitoring />} />

      {/* <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 6 && styles.isOpened}`}
        onClick={() => toggleSubMenu(6)}
      >
        <div className={styles.sidebarMenuLabel}>SPEED SUNCITY</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 6 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 6} component={<SpeedSuncity />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 7 && styles.isOpened}`}
        onClick={() => toggleSubMenu(7)}
      >
        <div className={styles.sidebarMenuLabel}>게임 관리 룰렛</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 7 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 7} component={<Roulette />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 8 && styles.isOpened}`}
        onClick={() => toggleSubMenu(8)}
      >
        <div className={styles.sidebarMenuLabel}>게임 관리 그래프15</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 8 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 8} component={<GameManageGraph15 />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 9 && styles.isOpened}`}
        onClick={() => toggleSubMenu(9)}
      >
        <div className={styles.sidebarMenuLabel}>게임 관리 하이로우5</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 9 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 9} component={<GameManageHighLow5 />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 10 && styles.isOpened}`}
        onClick={() => toggleSubMenu(10)}
      >
        <div className={styles.sidebarMenuLabel}>게임 관리 하이로우15</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 10 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 10} component={<GameManageHighLow15 />} /> */}

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[14] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(14)}
      >
        <div className={styles.sidebarMenuLabel}>충전/환전 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[14] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[14]} component={<Exchange />} />

      {/* <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 12 && styles.isOpened}`}
        onClick={() => toggleSubMenu(12)}
      >
        <div className={styles.sidebarMenuLabel}>유저커미션</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 12 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 12} component={<Commission />} /> */}

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[15] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(15)}
      >
        <div className={styles.sidebarMenuLabel}>유저 롤링</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[15] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[15]} component={<Rolling />} />

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[16] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(16)}
      >
        <div className={styles.sidebarMenuLabel}>이벤트 관련</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[16] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[16]} component={<LuckyEvent />} />

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[17] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(17)}
      >
        <div className={styles.sidebarMenuLabel}>고객센터&이벤트</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[17] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[17]} component={<CustomerService />} />

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[18] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(18)}
      >
        <div className={styles.sidebarMenuLabel}>통계&메인관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[18] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[18]} component={<StatisticalManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[19] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(19)}
      >
        <div className={styles.sidebarMenuLabel}>총판/매장 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[19] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[19]} component={<StoreManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList[20] ? styles.isOpened : ""}`}
        onClick={() => toggleSubMenu(20)}
      >
        <div className={styles.sidebarMenuLabel}>관리자 관리</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList[20] ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList[20]} component={<AdminManagement />} />
      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 21 && styles.isOpened}`}
        onClick={() => toggleSubMenu(21)}
      >
        <div className={styles.sidebarMenuLabel}>접속 통계</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 21 ? reverseIcon : menuIcon}</div>
      </div>
      <MenuList showMenu={showSubMenuList == 21} component={<AccessStatistics />} />
      <div
        className={styles.sidebarMenu}
        style={{ background: "linear-gradient(184deg, #DF1313 35.17%, #7C1010 87.53%)" }}
      >
        <div className={styles.sidebarMenuLabel} onClick={() => handleLogout()}>
          로그아웃
        </div>
      </div>
    </div>
  )
}
