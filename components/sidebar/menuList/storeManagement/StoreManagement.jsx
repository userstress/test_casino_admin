import Link from "next/link"
import { useRouter } from "next/router"
import { toast } from "react-toastify"

export default function StoreManagement() {
  const route = useRouter()

  return (
    <>
      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/StoreManage/distributorManagement") ? { color: "#FFA500" } : null}
      >
        <Link href={"/StoreManage/distributorManagement"}>
          <a>총판 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/StoreManage/distributorCalculate") ? { color: "#FFA500" } : null}
      >
        <Link href={"/StoreManage/distributorCalculate"}>
          <a>총판 정산</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/StoreManage/storeManagement") ? { color: "#FFA500" } : null}
      >
        <Link href={"/StoreManage/storeManagement"}>
          <a>매장 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/StoreManage/storeCalculate") ? { color: "#FFA500" } : null}
      >
        <Link href={"/StoreManage/storeCalculate"}>
          <a>매장 정산</a>
        </Link>
      </li>

      <Link href={"/newDomainNote"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/newDomainNote") ? { color: "#FFA500" } : {}}>
          신규 도메인 쪽지
        </li>
      </Link>
      <Link href={"/gradeManagement"}>
        <li
          className="sidebarSmallMenu"
          style={route.pathname.includes("/gradeManagement") ? { color: "#FFA500" } : {}}
        >
          등급별 관리
        </li>
      </Link>
      <Link href={"/gradeCalculate"}>
        <li className="sidebarSmallMenu" style={route.pathname.includes("/gradeCalculate") ? { color: "#FFA500" } : {}}>
          등급별 정산
        </li>
      </Link>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/StoreManage/levelManagement") ? { color: "#FFA500" } : null}
      >
        <Link href={"/StoreManage/levelManagement"}>
          <a>레벨별 관리</a>
        </Link>
      </li>

      <li
        className="sidebarSmallMenu"
        style={route.pathname.includes("/StoreManage/leveledSettle") ? { color: "#FFA500" } : null}
      >
        <Link href={"/StoreManage/leveledSettle"}>
          <a>레벨별 정산</a>
        </Link>
      </li>

      <li className="sidebarSmallMenu" style={route.pathname.includes("/mainInfo") ? { color: "#FFA500" } : {}}>
        <Link href={"https://dst-amazon-git-kkd-ansehs-projects.vercel.app/"}>
          <a>DST 총판 페이지 이동</a>
        </Link>
      </li>
    </>
  )
}
