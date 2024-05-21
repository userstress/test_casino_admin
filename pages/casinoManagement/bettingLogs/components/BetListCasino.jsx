import CustomTable from "@components/customTable/CustomTable"
import { getBetList } from "@utils/getBetList"
import { useAuthStore } from "@utils/useAuthStore"
import { useEffect, useState } from "react"
import { columns } from "../../../../components/columns/BetListCainoHeaderData.js"
import styles from "./BetListCasino.module.css"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export default function BetListCasino() {
  const { resultsData, callBetList } = getBetList()
  const [loading, setLoading] = useState()
  const { user } = useAuthStore()

  useEffect(() => {
    // 함수 컴포넌트 내에서 함수를 정의하여 사용
    const fetchData = async () => {
      setLoading(false)
      await callBetList("casino", 1, 1000)
      setLoading(true)
    }

    fetchData() // 데이터 로딩 함수 호출

    return () => {
      // 컴포넌트가 unmount 될 때 데이터 초기화
      setLoading(false)
      // resultsData 초기화 또는 null 값 할당 등 추가적인 초기화 로직이 필요할 경우 추가
    }
  }, [])

  return loading ? (
    resultsData && resultsData.length > 0 ? (
      <div className={styles.tableContainer}>
        <div className={styles.boxContainer}>
          <CustomTable columns={columns} rows={resultsData} checkbox={false} />
        </div>
      </div>
    ) : (
      <div>데이터가 없습니다</div>
    )
  ) : (
    <div>데이터를 가져오는 중입니다</div>
  )
}
