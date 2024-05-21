import styles from "./DSTLayout.module.css"
import Sidebar from "../DSTSidebar/Sidebar"
import Topbar from "../DSTOPbar/Topbar"
import Link from "next/link"

export default function DSTLayout({ children }) {
  return (
    <>
      <div className={styles.topLabel}>
        <Link href="/DST/infoes/mainInfo">
          <span>DST System</span>
        </Link>
      </div>
      <main className={styles.container}>
        <nav style={{ flex: "1" }}>
          <Sidebar />
        </nav>
        <section className={styles.contents}>
          <Topbar />
          {children}
        </section>
      </main>
    </>
  )
}
