import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./AdminIPList.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"

export default function AdminIPList() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const [rows, setRows] = useState()
  const [inputIp, setInput] = useState({ first: "", second: "", third: "", fourth: "", names: "" })

  const takeList = () => {
    // event.preventDefault()
    const method = "GET"
    const url = `/api/v2/admins/approve-ips`
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
          responseData.data.map((obj, index) => {
            return { ...obj, id: index }
          }),
        )
        console.log(responseData.data)
        // toast.success("삭제했습니다")
        // router.reload()
      }
    })
    return
  }

  const handleDelete = (event, params) => {
    event.preventDefault()
    const method = "DELETE"
    const url = `/api/v2/admins/delete-approve-ip/${params.row.userId}`
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
        toast.success("삭제했습니다")
        takeList()
      }
    })
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    const method = "POST"
    const url = `/api/v2/managers/ip`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    const body = {
      ipContent: `${inputIp.first}.${inputIp.second}.${inputIp.third}.${inputIp.fourth}`,
      note: inputIp.names,
    }

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("관리자에게 문의 해 주세요.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("등록했습니다")
        takeList()
      }
    })
  }
  useEffect(() => {
    takeList()
  }, [])
  const columns = [
    { field: "접속가능 IP", headerName: "IP", maxWidth: 500, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "등록일", headerName: "등록일", maxWidth: 480, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "사용자", headerName: "사용자", maxWidth: 380, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "adminLoginAt",
      headerName: "사이트",
      maxWidth: 200,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params?.row?.store || "MEGA"
      },
    },
    {
      field: "isSuccess",
      headerName: "등록",
      maxWidth: 140,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <button
            onClick={(event) => handleDelete(event, params)}
            style={{
              backgroundColor: "#0000FF",
              width: "50px",
              margin: "0% auto",
              color: "white",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
            className="table-cells-muis-btns-common"
          >
            삭제
          </button>
        )
      },
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"매장관리 IP 관리"} customStyle={{ height: "1.979vw", width: "100%" }} />
      {/* <CustomBar customStyle={{ justifyContent: "normal" }}>
        <div className={styles.boxContainer1}>
          <div style={{ width: "200px", display: "flex", justifyContent: "center" }}>IP</div>
          <input
            style={{ width: "100px", backgroundColor: "" }}
            onChange={(event) => setInput({ ...inputIp, first: event.target.value })}
          />
          <span style={{ display: "flex", height: "30px", alignItems: "flex-end" }}>.</span>
          <input
            style={{ width: "100px", backgroundColor: "" }}
            onChange={(event) => setInput({ ...inputIp, second: event.target.value })}
          />
          <span style={{ display: "flex", height: "30px", alignItems: "flex-end" }}>.</span>
          <input
            style={{ width: "100px", backgroundColor: "" }}
            onChange={(event) => setInput({ ...inputIp, third: event.target.value })}
          />
          <span style={{ display: "flex", height: "30px", alignItems: "flex-end" }}>.</span>
          <input
            style={{ width: "100px", backgroundColor: "" }}
            onChange={(event) => setInput({ ...inputIp, fourth: event.target.value })}
          />
        </div>

        <div className={styles.boxContainer1}>
          <div style={{ width: "200px", display: "flex", justifyContent: "center" }}>사용자</div>
          <input
            style={{ width: "250px", height: "100%", backgroundColor: "" }}
            onChange={(event) => setInput({ ...inputIp, names: event.target.value })}
          />
        </div>
        <button
          style={{
            width: "60px",
            height: "25px",
            color: "white",
            backgroundColor: "#3342C9",
            border: "none",
            borderRadius: "4px",
          }}
          onClick={handleSubmit}
        >
          {" "}
          등록
        </button>
      </CustomBar> */}
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows ? rows : []} checkbox={false} />
      </div>
    </div>
  )
}
