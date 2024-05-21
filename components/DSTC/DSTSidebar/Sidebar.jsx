import React, { useState } from "react"
import styles from "./Sidebar.module.css"
import MenuList from "./menuList/MenuList"
import UserManagement from "./menuList/UserManagement"
import BetList from "./menuList/BetList"
import Report from "./menuList/Report"
import Community from "./menuList/Community"
import System from "./menuList/System"

export default function Sidebar() {
  const menuIcon = (
    <svg width="0.5vw" height="0.625vw" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 12L13.9282 0H0.0717969L7 12Z" fill="white" />
    </svg>
  )

  const reverseIcon = (
    <svg width="0.5vw" height="0.625vw" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 0L13.9282 12H0.0717969L7 0Z" fill="#FFA500" />
    </svg>
  )

  const [showSubMenuList, setShowSubMenuList] = useState(0)

  const toggleSubMenu = (menuTab) => {
    setShowSubMenuList(menuTab)

    if (showSubMenuList == menuTab) {
      setShowSubMenuList(0)
    }
  }

  return (
    <div className={styles.sidebar}>
      <section className={styles.titleWrapper}>
        <titlebox className={styles.companyName}>DST System</titlebox>
      </section>

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 1 && styles.isOpened}`}
        onClick={() => toggleSubMenu(1)}
      >
        <div className={styles.sidebarMenuLabel}>즐겨찾기</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 1 ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      {/* <MenuList showMenu={showSubMenuList == 1} component={<UserManagement />} /> */}

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 2 && styles.isOpened}`}
        onClick={() => toggleSubMenu(2)}
      >
        <div className={styles.sidebarMenuLabel}>USER MANAGEMENT</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 2 ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      <MenuList showMenu={showSubMenuList == 2} component={<UserManagement />} />

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 3 && styles.isOpened}`}
        onClick={() => toggleSubMenu(3)}
      >
        <div className={styles.sidebarMenuLabel}>BET LIST</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 3 ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      <MenuList showMenu={showSubMenuList == 3} component={<BetList />} />

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 4 && styles.isOpened}`}
        onClick={() => toggleSubMenu(4)}
      >
        <div className={styles.sidebarMenuLabel}>REPORT</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 4 ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      <MenuList showMenu={showSubMenuList == 4} component={<Report />} />

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 5 && styles.isOpened}`}
        onClick={() => toggleSubMenu(5)}
      >
        <div className={styles.sidebarMenuLabel}>COMMUNITY</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 5 ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      <MenuList showMenu={showSubMenuList == 5} component={<Community />} />

      <div
        className={`${styles.sidebarMenu} ${showSubMenuList == 6 && styles.isOpened}`}
        onClick={() => toggleSubMenu(6)}
      >
        <div className={styles.sidebarMenuLabel}>SYSTEM</div>
        <div className={styles.sidebarMenuIcon}>{showSubMenuList == 6 ? reverseIcon : menuIcon}</div>
      </div>
      {/* 서브메뉴 목록 */}
      <MenuList showMenu={showSubMenuList == 6} component={<System />} />

      <div
        className={styles.sidebarMenu}
        style={{ background: "linear-gradient(184deg, #DF1313 35.17%, #7C1010 87.53%)" }}
      >
        <div className={styles.sidebarMenuLabel}>로그아웃</div>
      </div>
    </div>
  )
}
