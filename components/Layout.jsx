import styles from "./Layout.module.css"
import Sidebar from "./sidebar/Sidebar"
import Topbar from "./topbar/Topbar"
import { useRouter } from "next/router"

export default function Layout({ children }) {
  return (
    <>
      <div className={styles.topLabel}>
        <span style={{ padding: "0 5px" }}>
          <div>INFORMATION ADMINISTRATOR</div>

          {/* <div>즐겨 찾기 추가</div> */}
        </span>
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
