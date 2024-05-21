import styles from "./index.module.css"
import Layout from "@components/Layout"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getCookie } from "cookies-next"
import { useEffect } from "react"
import { toast } from "react-toastify"
import { useState } from "react"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { ktimeTrans2 } from "@utils/ktimetrans"

export default function index() {
  const [data, setData] = useState()
  const { sendRequest } = useAxiosRequest([])

  const getData = () => {
    // /api/v2/managers/login-inquiry/{articleId}/complete

    const method = "GET"
    const url = `/api/v2/managers/password-change/all`
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
        setData(responseData.data)
        console.log(responseData.data)
      }
    })
  }

  const approvals = (event, params) => {
    // /api/v2/managers/login-inquiry/{articleId}/complete

    const method = "PUT"
    const url = `/api/v2/managers/password-change/approve/${params.row.id}`
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
        toast.success("승인했습니다")
        getData()
      }
    })
  }
  const cancels = (event, params) => {
    // /api/v2/managers/login-inquiry/{articleId}/complete

    const method = "PUT"
    const url = `/api/v2/managers/password-change/cancel/${params.row.id}`
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
        toast.success("취소하였습니다")
        getData()
      }
    })
  }

  function sendNotesingle(event, ids) {
    event.preventDefault()
    event.stopPropagation()
    window.open(`/sendingNote?userId=${ids}`, "쪽지", "width=1024, height=500")
  }
  const inputSS = {
    width: "100px",
    height: "99%",
    marginLeft: "1px",
    marginRight: "2px",
    fontSize: "10px",
    textAlign: "center",
    padding: "0",
    borderRadius: "4px",
    border: "none",
  }
  const columns = [
    { field: "id", headerName: "번호", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "username",
      headerName: "아이디",

      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "nickname", headerName: "닉네임", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "status", headerName: "상태", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "phone", headerName: "폰번호", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "ownerName", headerName: "예금주", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "number", headerName: "계좌번호", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "ip", headerName: "신청IP", flex: 0.8, headerAlign: "center", align: "center" },
    { field: "lastAccessedIp", headerName: "최근로그인IP", flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "createdAt",
      headerName: "신청시간",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTrans2(params.formattedValue)
      },
    },
    {
      field: "processedAt",
      headerName: "처리시간",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTrans2(params.formattedValue)
      },
    },
    {
      field: "processedUsername",
      headerName: "처리자",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "accept",
      headerName: "승인",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button
              style={{ ...inputSS, backgroundColor: "blue", color: "white" }}
              onClick={(event) => approvals(event, params)}
            >
              승인
            </button>
          </>
        )
      },
    },
    {
      field: "reject",
      headerName: "거절",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button
              style={{ ...inputSS, backgroundColor: "red", color: "white" }}
              onClick={(event) => cancels(event, params)}
            >
              거절
            </button>
          </>
        )
      },
    },
    {
      field: "note",
      headerName: "쪽지",
      flex: 0.8,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return (
          <>
            <button style={inputSS} onClick={(event) => sendNotesingle(event, 1)}>
              쪽지
            </button>
          </>
        )
      },
    },

    // { field: "del", headerName: "삭제", flex: 0.8, headerAlign: "center", align: "center" },
  ]

  useEffect(() => {
    getData()
  }, [])
  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={`비밀번호 변경 신청 내역 (전체 : ${(data && data.length) || 0})`}
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      {/* <CustomBar customStyle={{ justifyContent: "center" }}>
        <DatePickerComponent
          customStyle={{ width: "20%", justifyContent: "space-around" }}
          textStyle={{ width: "3.8vw", textAlign: "center" }}
          text={"시작일자 :"}
        />
        <DatePickerComponent
          customStyle={{ width: "20%", justifyContent: "space-around" }}
          textStyle={{ width: "3.8vw", textAlign: "center" }}
          text={"종료일자 :"}
        />
      </CustomBar> */}
      <CustomTable columns={columns} checkbox={false} rows={data || []} />
    </div>
  )
}
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
