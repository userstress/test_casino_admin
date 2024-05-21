import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./CouponLogList.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import axios from "axios"
import baseUrl from "@utils/REST/baseUrl"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"

export default function CouponLogList() {
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const userToken = getCookie("token")
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const [datdas, setDatas] = useState([])
  const mytoken = getCookie("token")
  const [cou, setCou] = useState()
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const columns = [
    { field: "id", headerName: "No.", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "nickName",
      headerName: "아이디(닉네임)",
      flex: 2.08,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.row.userName + "( " + params.row.nickName + " )"}</div>
      },
    },
    {
      field: "couponName",
      headerName: "쿠폰명",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.row.couponName === "MONEY_COUPON" ? "머니쿠폰" : "행운로또"}</div>
      },
    },
    { field: "balance", headerName: "금액", flex: 2.05, headerAlign: "center", align: "center" },
    { field: "createdAt", headerName: "지급일", flex: 2.05, headerAlign: "center", align: "center" },
    { field: "expirationDateTime", headerName: "사용기간", flex: 2.05, headerAlign: "center", align: "center" },
    {
      field: "lastModifiedAt",
      headerName: "사용일",
      flex: 2.05,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handleClick = (event) => {
          setCou(params.row)
          console.log(cou)
        }
        return <div onClick={handleClick}>{params.row.status === "WAITING" ? "미사용" : params.lastModifiedAt}</div>
      },
    },
  ]
  // function reQuestJson() {
  //   const method = "GET"
  //   const url = "/api/v1/coupon/all?page=1&size=999"
  //   const headers = { "Content-Type": "application/json", Authorization: mytoken }
  //   sendRequest(method, url, headers, null, (errorStatus, responseData) => {
  //     if (errorStatus >= 500) {
  //       toast.warn("중복된 회원정보 입니다.")
  //     } else if (errorStatus === 400) {
  //       toast.warn("올바르지 않은 입력 값입니다.")
  //     } else if (errorStatus === 403 || errorStatus === 401) {
  //               toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })

  //     } else if (errorStatus === 404) {
  //       toast.error("서버 응답이 없습니다.")
  //     } else if (!errorStatus && responseData) {
  //       setDatas(responseData.data.data)
  //       return console.log(responseData.data.data)
  //     }
  //   })
  // }
  const fetchData = async () => {
    try {
      const statusOptions = ["APPROVAL", "CANCELLATION", "WAITING", "EXPIRED"]

      const headers = {
        Authorization: `${userToken}`, // 토큰을 Authorization 헤더에 추가
      }

      const ress = axios.get(`${baseUrl}api/v2/coupon/managers/coupon/all-transactions`, {
        headers,
      })
      setDatas(ress)
      // const responses = await Promise.all(
      //   statusOptions.map((status) =>
      //     axios.get(`${baseUrl}api/v1/managers/coupon/all-transactions`, {
      //       headers,
      //     }),
      //   ),
      // )
      // setDatas([
      //   ...responses[0].data.data,
      //   ...responses[1].data.data,
      //   ...responses[2].data.data,
      //   ...responses[3].data.data,
      // ])
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
    const userAgent = window.navigator.userAgent
  }, [datepick])

  const [selectionModel, setSelectionModel] = useState([])

  const handleSelectionChange = (selectedId) => {
    const selectedRows = selectedId.map((id) => datdas.find((row) => row.id === id)).filter((row) => row != null) // null 또는 undefined를 제외
    setSelectionModel(selectedRows)
  }

  function deleteCouponLog() {
    const method = "GET"
    const url = "/api/v1/coupon/managers/status/cancel"
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("선택된 정보가 없습니다")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        setDatas(responseData.data.data)
        return console.log(responseData.data.data)
      }
    })
  }

  return (
    <>
      <CustomHeader
        text={"충전/환전 관리 ▶ 쿠폰 지급 정보"}
        customStyle={{ height: "38px", width: "100%", fontWeight: "500" }}
      />
      <CustomBar customStyle={{ display: "flex" }}>
        <div className={styles.boxInner}>
          <div className={styles.boxContainer2}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "3.8vw", textAlign: "center" }}
              text={"시작일자 :"}
              getDate={handleStartDateChange}
            />
          </div>
          <div className={styles.boxContainer2}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "3.8vw", textAlign: "center" }}
              text={"종료일자 :"}
              getDate={handleEndDateChange}
            />
          </div>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable handleSelectionChange={handleSelectionChange} columns={columns} rows={datdas} />
        <div style={{ margin: "5px 0 5px 5px" }}>
          <button
            style={{ padding: "0", width: "120px", height: "22px", backgroundColor: "#808080", color: "white" }}
            type="button"
            onClick={() => deleteCouponLog()}
          >
            선택 삭제
          </button>
        </div>
      </div>
    </>
  )
}
