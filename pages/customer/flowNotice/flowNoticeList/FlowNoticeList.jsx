// 2. 흐르는 공지
import { useState, useEffect } from "react"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./FlowNoticeList.module.css"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import axios from "axios"
import { toast } from "react-toastify"
import { boardStore } from "@utils/boardStore/boardStore"

export default function FlowNoticeList() {
  const router = useRouter()
  const [rows, setRows] = useState()
  const { boardType, boardMove } = boardStore()

  async function delBtn(id) {
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    const baseUrl = `https://dailymodelapp.com/api/v2/managers/flow/notices/delete/${id}`

    try {
      await axios.delete(`${baseUrl}`, { headers: headers }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          toast.success("삭제되었습니다")
          return fetchLevelsData()
        }
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      // 오류가 발생하면 빈 배열 또는 오류 메시지를 반환할 수 있습니다.
      return []
    }
  }

  function moveTofix(id, params) {
    const pageInfoes = {
      id: params.row.id,
      type: "flow",
      contents: params.row.content,
      title: params.row.title,
      isTop: true,
    }
    boardMove(pageInfoes)
    router.push(`/customer/flowNotice/${id}`)
  }

  const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

  async function fetchLevelsData() {
    const baseUrl = `https://dailymodelapp.com/api/v2/users/flow/notices/all`

    try {
      const response = await axios.get(`${baseUrl}`, { headers: headers })
      const data = response.data.reverse() // 응답 데이터를 가져옵니다.

      setRows(data) // 모든 요청이 성공적으로 완료된 후 배열을 반환합니다.
    } catch (error) {
      console.error("Error fetching data:", error)
      // 오류가 발생하면 빈 배열 또는 오류 메시지를 반환할 수 있습니다.
      return []
    }
  }

  useEffect(() => {
    fetchLevelsData()
  }, [router.isReady])

  useEffect(() => {}, [rows])

  const columns = [
    { field: "id", headerName: "No.", flex: 1, minWidth: 152, headerAlign: "center", align: "center" },
    {
      field: "content",
      headerName: "제목",
      flex: 9,
      width: 152,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div onClick={() => moveTofix(params.row.id, params)}>{params.formattedValue}</div>
      },
    },
    {
      field: "state",
      headerName: "상태",
      flex: 2,
      minWidth: 152,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <button onClick={() => delBtn(params.row.id)} type="button">
            삭제
          </button>
        )
      },
    },
  ]

  return (
    <>
      <CustomHeader text={"흐르는 공지"} customStyle={{ height: "1.979vw", width: "100%", fontSize: "13px" }} />
      <div>
        <CustomTable columns={columns} rows={rows ? rows : []} checkbox={false} />
      </div>
      <div className={styles.footerContainer}>
        <button
          style={{ width: "100%", height: "45%", backgroundColor: "#3B4281", color: "white", fontSize: "13px" }}
          onClick={() => router.push(`/customer/flowNotice/new`)}
        >
          등록
        </button>
      </div>
    </>
  )
}
