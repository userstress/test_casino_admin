import React, { useState, useEffect } from "react"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import { Select, FormLabel, input, FormHelperText } from "@mui/material"
import styles from "./ChangeLog.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import ktimeTrans from "@utils/ktimetrans"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"

export default function ChangeLog() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const [total, setTotal] = useState(0)
  const [datas, setData] = useState()
  const [datepick, setDates] = useState()
  const mytoken = getCookie("token")
  const [info, setInfoes] = useState({
    username: "string",
    password: "string",
    nickname: "string",
    phone: "string",
    approveIP: "string",
    role: "string",
    amazonUserStatus: "APPROVE",
  })
  const handleStartDateChange = (startDate) => {
    setDates({ ...datepick, start: datePickerTrans(startDate) })
  }
  const handleEndDateChange = (endDate) => {
    setDates({ ...datepick, end: datePickerTrans(endDate) })
  }

  // function Iprequest() {
  //   const method = "GET"
  //   const url = `/api/v2/admins/history/success`
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
  //       setData(responseData.data)
  //     }
  //   })
  // }

  function handleSubmit(event) {
    const method = "POST"
    const url = `/amazon/api/v2/admin`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    const body = {
      username: "string",
      password: "string",
      nickname: "string",
      phone: "string",
      approveIP: "string",
      role: "string",
      amazonUserStatus: "APPROVE",
    }

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("등록에 성공했습니다.")
      }
    })
  }

  // useEffect(() => {
  //   if (router.isReady && !datas) {
  //     Iprequest()
  //   }
  //   const toggleData = () => {
  //     Iprequest()
  //   }

  //   const intervalId = setInterval(toggleData, 10000) // 5초마다 toggleData 실행
  //   return () => clearInterval(intervalId) // 컴포넌트가 언마운트될 때 인터벌 정리
  // }, [router.isReady])

  const columns = [
    {
      field: "id",
      headerName: "번호",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "userName",
      headerName: "아이디",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "nickname",
      headerName: "닉네임",

      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    { field: "password", headerName: "비밀번호", flex: 1, headerAlign: "center", align: "center" },
    { field: "phone", headerName: "핸드폰번호", flex: 1, headerAlign: "center", align: "center" },
    ,
    { field: "bankName", headerName: "은행", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "bankNumber",
      headerName: "계좌번호",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "email",
      headerName: "이메일",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "names",
      headerName: "예금주",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "Lv",
      headerName: "레벨",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "status",
      headerName: "상태",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "referredBy",
      headerName: "추천인",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "distributor",
      headerName: "총판/매장",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "changed",
      headerName: "바뀐컬럼",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "prevValue",
      headerName: "변경전값",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "chnagedValue",
      headerName: "변경후값",
      flex: 1,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "processedAt",
      headerName: "변경일자",
      flex: 1.5,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        return ktimeTrans(params.formattedValue)
      },
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"추천인 코드 관리"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <div className={styles.Dates}>
        <DatePickerComponent
          text={"시작일자:"}
          getDate={handleStartDateChange}
          customStyle={{ width: "300px", justifyContent: "space-around" }}
        />
        <DatePickerComponent
          text={"종료일자:"}
          getDate={handleEndDateChange}
          customStyle={{ width: "300px", justifyContent: "space-around" }}
        />
      </div>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={datas ? datas : []} checkbox={false} />
      </div>
    </div>
  )
}
