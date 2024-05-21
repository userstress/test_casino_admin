// 머니사용로그
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./UsedPointLogList.module.css"
import CustomButton from "@components/customButton/CustomButton"
import CustomBar from "@components/custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import CustomInput from "@components/customInput/CustomInput"
import { Box, List } from "@mui/material"
import clsx from "clsx"
import { useState, useEffect } from "react"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { toast } from "react-toastify"
import { useAuthStore } from "@utils/useAuthStore"

export default function UsedPointLogList() {
  //데이터 불러올때
  const [total, setTotal] = useState(0)
  const [datepick, setDate] = useState({ start: "", end: "" })
  const { sendRequest } = useAxiosRequest()
  const [Listof, setList] = useState([])

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
  }
  const columns = [
    { field: "id", headerName: "id" },
    { field: "userId", headerName: "No.", width: 70 },
    {
      field: "nickName",
      headerName: "ID(닉네임)",
      width: 180,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        console.log(params)
        return <div>{`${params.row.userName} (${params.formattedValue})`}</div>
      },
    },
    {
      field: "usedMoney",
      headerName: "사용내역",
      maxWidth: 160,
      flex: 1,

      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.row.formattedValue ? params.row.formattedValue : "비고"}</div>
      },
    },
    {
      field: "point",
      headerName: "포인트",
      maxWidth: 160,
      flex: 1,
      cellClassName: "super-app-theme--cell",
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return params.formattedvalue
      },
    },
    {
      field: "content",
      headerName: "내용",
      maxWidth: 431,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.row.formattedValue ? params.row.formattedValue : "비고"}</div>
      },
    },
    { field: "category", headerName: "타입", maxWidth: 60, flex: 1, headerAlign: "center", align: "center" },
    { field: "createdAt", headerName: "등록일시", maxWidth: 154, flex: 1, headerAlign: "center", align: "center" },
    {
      field: "about",
      headerName: "비고",
      maxWidth: 431,
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return <div>{params.row.formattedValue ? params.row.formattedValue : "비고"}</div>
      },
    },
  ]
  const rows = [
    {
      id: 1,
      number: 1,
      nickname: "www",
      usedMoney: 0,
      point: "베팅차감",
      content: "187196145898 (슬롯)",
      type: "차감",
      date: "2023-09-25   11:59:24",
      about: "베팅상세",
    },
    {
      id: 2,
      number: 2,
      nickname: "www",
      usedMoney: 1000,
      point: "베팅차감",
      content: "187196145891 (슬롯)",
      type: "차감",
      date: "2023-09-24   11:59:24",
      about: "베팅상세",
    },
    {
      id: 3,
      number: 3,
      nickname: "www",
      usedMoney: 3000,
      point: "베팅차감",
      content: "187196145891 (슬롯)",
      type: "등록",
      date: "2023-09-24   11:59:24",
      about: "베팅상세",
    },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const { userToken } = useAuthStore()

  function requestList() {
    const method = "GET"
    const url = `/api/v1/managers/point-log?page=1&size=1000&startDate=${datepick.start}&endDate=${datepick.end}`
    const headers = { Authorization: `${userToken}`, "Content-Type": "application/json" }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        const result = responseData.data.map((item) => ({
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
  }, [datepick])

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={"포인트 사용 기록"}
        customStyle={{ height: "38px", width: "100%", backgroundColor: "#181D4B", margin: 0 }}
      />
      <CustomBar>
        <div className={styles.boxContainer1}>
          <DatePickerComponent
            setDate={handleStartDateChange}
            className={styles.customCalendar}
            text={"시작일자 :"}
            textStyle={{ width: "26%" }}
          />
          <DatePickerComponent
            setDate={handleEndDateChange}
            className={styles.customCalendar}
            text={"종료일자 :"}
            textStyle={{ width: "26%" }}
          />
        </div>
      </CustomBar>

      <CustomBar>
        <div style={{ width: "40%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>*자동지급 포인트 (업데이트중)</div>
          <div>*수동 지급 포인트 (업데이트중)</div>
          <div>*포인트 사용 이력 (업데이트중)</div>
        </div>
        <div
          style={{
            height: "100%",
            width: "30%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            margin: "0 10px",
          }}
        >
          <CustomInput
            customStyle={{ width: "49%", backgroundColor: "#D9D9D9", textAlign: "right", paddingRight: "10px" }}
            inputs={total}
          />
          <CustomInput
            customStyle={{ width: "49%", backgroundColor: "#D9D9D9", textAlign: "right", paddingRight: "10px" }}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <Box
          sx={{
            width: "100%",
            "& .super-app-theme--cell": {
              color: "green",
            },
            "& .super-app.negative": {
              color: "red",
            },
            "& .super-app.positive": {
              color: "blue",
            },
          }}
        >
          <CustomTable columns={filteredColumns} rows={Listof} />
        </Box>
      </div>
      <div className={styles.footerContainer}>
        <CustomButton
          customStyle={{ width: "100%", height: "45%", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"등록"}
        />
      </div>
    </div>
  )
}
