import { useState, useEffect } from "react"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import styles from "./ReceiveList.module.css"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getCookie } from "cookies-next"
import axios from "axios"
import baseUrl from "@utils/REST/baseUrl"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import DayTransform, { fetchDate } from "@utils/DayTransform"

// 136 충전/환전 관리(문자 수신 목록)
export default function ReceiveList() {
  const [Rows, setRow] = useState()
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }

  const columns = [
    { field: "username", headerName: "id" },
    { field: "id", headerName: "No.", maxWidth: 50 },
    { field: "site", headerName: "사이트", maxWidth: 60, flex: 1, headerAlign: "center", align: "center" },
    // { field: "phone", headerName: "수신번호", maxWidth: 150, flex: 1, headerAlign: "center", align: "center" },
    // { field: "type", headerName: "입출금", maxWidth: 100, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "bank",
      headerName: "은행명",
      maxWidth: 130,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params?.row?.wallet?.bankName
      },
    },
    {
      field: "number",
      headerName: "계좌번호",
      maxWidth: 220,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params?.row?.wallet?.number
      },
    },
    {
      field: "ownerName",
      headerName: "입금명",
      maxWidth: 100,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.row.wallet.ownerName
      },
    },
    {
      field: "processedAt",
      headerName: "고객 입금 시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return fetchDate(params.row.processedAt)
      },
    },
    {
      field: "processedAt2",
      headerName: "문자 접수 시간",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return fetchDate(params.row.processedAt)
      },
    },
    {
      field: "message",
      headerName: "메시지",
      flex: 2,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "상태",
      maxWidth: 80,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        let show
        if (params.formattedValue === "AUTO_APPROVAL") {
          show = "문자 수신"
        } else {
          show = "문자 미수신"
        }
        return <div>{show}</div>
      },
    },
  ]

  const filteredColumns = columns

  const fetchData = async () => {
    try {
      const statusOptions = ["APPROVAL", "UNREAD", "WAITING", "CANCELLATION", "AUTO_APPROVAL", "TIMEOUT"]

      const responses = await Promise.all(
        statusOptions.map((status) =>
          axios
            .get(
              `${baseUrl}api/v2/managers/rt/created?startDate=${datepick.start}&endDate=${datepick.end}&status=${status}`,
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `${getCookie("token")}`, // 'Bearer ' 접두어가 필요한 경우 추가
                },
              },
            )
            .then((response) => ({
              data: response.data,
              status, // 응답 객체에 status 추가
            })),
        ),
      )

      // responses 배열은 이제 각 요소마다 status 값을 포함합니다.
      const apiDataCombined = responses.flatMap((response) =>
        response.data.map((item) => {
          const { id, ...walletWithoutId } = item.wallet // wallet에서 id 속성을 제외
          return {
            ...item,
            ...walletWithoutId, // id가 제외된 wallet 객체를 스프레드
            walletId: id, // 원래의 wallet.id를 walletId로 명시적으로 추가
            status: response.status, // 각 아이템에 status 값을 추가
            processedAt: item.processedAt,
          }
        }),
      )

      setRow(apiDataCombined)
      console.log(apiDataCombined)
      if (optionData && options !== "all" && apiDataCombined) {
        changeOption(options, apiDataCombined)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [datepick])

  useEffect(() => {
    console.log(Rows)
  }, [Rows])
  return (
    <>
      <CustomHeader text={"문자 수신 목록"} customStyle={{ height: "38px", maxWidth: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0", justifyContent: "center" }}>
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"시작일자 :"}
            getDate={handleStartDateChange}
            customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
          />
        </div>
        &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"종료일자 :"}
            getDate={handleEndDateChange}
            customStyle={{ justifyContent: "space-around" }}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable SoltedModel={[{ field: "id", sort: "desc" }]} columns={filteredColumns} rows={Rows || []} />
      </div>
    </>
  )
}
