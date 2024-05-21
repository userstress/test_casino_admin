import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./WithdrawCalList.module.css"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import dateSortComparator from "@utils/REST/LIST/dateSort"
import { useGridApiRef } from "@mui/x-data-grid"
import { useEffect, useState } from "react"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { fetchDate } from "@utils/DayTransform"
import { toast } from "react-toastify"

export default function WithdrawCalList() {
  const aggres = { exchangeAmount: "sum" }
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const userToken = getCookie("token")
  const [Listof, setList] = useState([])
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const { sendRequest } = useAxiosRequest()
  const apiRef = useGridApiRef()

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  function requestList() {
    const method = "GET"
    const url = `https://dailymodelapp.com/api/v2/managers/et?startDate=${datepick.start}&endDate=${datepick.end}&status=APPROVAL`
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        const result = responseData.data.data.map((item) => ({
          ...item,
          rechargeAmount: Number(item.rechargeAmount), // 필요한 변환 적용
        }))
        setList(result)
      }
      return false
    })
  }

  useEffect(() => {
    requestList()
    console.log(Listof)
  }, [datepick])

  const columns = [
    { field: "lv", headerName: "Lv", flex: 1.67, headerAlign: "center", align: "center" },
    {
      field: "username",
      headerName: "아이디",
      flex: 2.0,
      headerAlign: "center",
      align: "center",
      // valueGetter: (params) => params.row.user.username,
    },
    {
      field: "nickname",
      headerName: "닉네임",
      flex: 6.67,
      headerAlign: "center",
      align: "center",
      // valueGetter: (params) => params.row.user.nickname,
    },
    { field: "phone", headerName: "연락처", flex: 6.67, headerAlign: "center", align: "center" },
    {
      field: "distributor",
      headerName: "총판",
      flex: 3.33,
      headerAlign: "center",
      align: "center",
    },
    { field: "market", headerName: "매장", flex: 3.33, headerAlign: "center", align: "center" },
    {
      field: "exchangeAmount",
      headerName: "충전금액",
      flex: 5,
      headerAlign: "center",
      align: "center",
      type: "number",
      renderCell: (params) => {
        console.log(params)
        if (isNaN(params.id)) {
          return <div style={{ color: "#0000FF", fontSize: "12px" }}>총 합계&nbsp;&nbsp;{params.formattedValue}원</div>
        } else return <div>{params.formattedValue}</div>
      },
    },
    {
      field: "bank",
      headerName: "은행",
      flex: 3,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.wallet && params.row.wallet.bankName && params.row.wallet.bankName
      },
    },
    {
      field: "owner_name",
      headerName: "예금주",
      flex: 3.33,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.wallet && params.row.wallet.ownerName && params.row.wallet.ownerName
      },
    },
    {
      field: "bankAccount",
      headerName: "계좌번호",
      flex: 3.67,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => {
        return params.row.wallet && params.row.wallet.number && params.row.wallet.number
      },
    },
    {
      field: "createdAt",
      headerName: "신청일",
      flex: 3,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => fetchDate(params.row.createdAt),
    },
    {
      field: "processedAt",
      headerName: "확인일",
      flex: 3,
      headerAlign: "center",
      align: "center",
      valueGetter: (params) => fetchDate(params.row.processedAt),
    },
    {
      field: "status",
      headerName: "상태",
      flex: 1.0,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        if (params.row.status === "APPROVAL") {
          return <div>승인</div>
        }
        if (params.row.status === "WAITING") {
          return <div>대기</div>
        }
      },
    },
  ]

  return (
    <>
      <CustomHeader
        text={
          <div>
            정산관리&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>
            &nbsp;출금 상세 정보
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.boxInner}>
          <div className={styles.boxContainer3}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              text={"시작일자 :"}
              getDate={handleStartDateChange}
            />
          </div>
          <div>&nbsp;&nbsp;&nbsp;~&nbsp;</div>
          <div className={styles.boxContainer3}>
            <DatePickerComponent
              customStyle={{ width: "100%", justifyContent: "space-around" }}
              textStyle={{ width: "4.5vw", textAlign: "center" }}
              text={"종료일자 :"}
              getDate={handleEndDateChange}
            />
          </div>
        </div>
      </CustomBar>
      <div>
        <CustomTable
          SoltedModel={[{ field: "createdAt", sort: "desc" }]}
          refs={apiRef}
          aggregations={aggres}
          columns={columns}
          rows={Listof}
          checkbox={false}
        />
      </div>
    </>
  )
}
