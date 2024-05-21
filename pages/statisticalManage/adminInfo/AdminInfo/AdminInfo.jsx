import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./AdminInfo.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import { ktimeTransThird } from "@utils/ktimetrans"

export default function AdminIPList() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const [rows, setRows] = useState()

  const columns = [
    {
      field: "id",
      headerName: "No.",
      maxWidth: 500,
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "username",
      headerName: "관리자 아이디 [실패 아이디 포함]",
      maxWidth: 480,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "attemptIp", headerName: "관리자 IP", maxWidth: 380, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "attemptDate",
      headerName: "관리자 접속시간",
      maxWidth: 200,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTransThird(params.formattedValue)
      },
    },
    {
      field: "loginResult",
      headerName: "성공/실패",
      maxWidth: 140,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const isGood = params.formattedValue === "성공"
        return (
          <div style={{ color: isGood ? "blue" : "red", fontWeight: "bold", fontSize: "12px" }}>
            {params.formattedValue}
          </div>
        )
      },
    },
  ]

  const takeList = () => {
    const method = "GET"
    const url = `/api/v2/admins/history/all`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        setRows(
          responseData.data
            .map((obj, index) => {
              return { ...obj, id: index }
            })
            .reverse(),
        )
        console.log(responseData.data)
        // toast.success("삭제했습니다")
        // router.reload()
      }
    })
    return
  }

  useEffect(() => {
    takeList()
  }, [])
  // 리스트불러오기 작성해야함.

  const [inputs, setInputs] = useState({ username: "", ip: "" })

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"관리자 IP 관리"} customStyle={{ height: "1.979vw", width: "100%" }} />

      <div className={styles.tableContainer}>
        <CustomTable
          columns={columns}
          rows={rows ? rows : []}
          checkbox={false}
          pageSizese={20}
          pageSizeOptionses={[20]}
          paginationAuto={true}
        />
      </div>
      <div className={styles.adminBtnBox}>
        <button type="button" onClick={() => router.push("/managerTap/adminInfo")}>
          관리자 추가
        </button>
        {/* <button type="button">관리자 리스트 보기</button> */}
      </div>
    </div>
  )
}
