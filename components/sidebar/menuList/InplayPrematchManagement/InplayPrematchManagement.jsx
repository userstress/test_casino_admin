import Link from "next/link"
import { useRouter } from "next/router"
import React from "react"
import { toast } from "react-toastify"

function InplayPrematchManagement() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/inplayFree/resultAll") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/inplayFree/resultAll"}>인/프 정산확인</Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/inplayFree/imageRegister") ? { color: "#FFA500" } : {}}
      >
        <Link href={"/inplayFree/imageRegister"}>이미지 등록</Link>
      </li>
    </>
  )
}

export default InplayPrematchManagement
