import React, { useState, useEffect } from "react"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import { Select, FormLabel, input, FormHelperText } from "@mui/material"
import styles from "./ReffererCode.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import { useRouter } from "next/router"
import ktimeTrans from "@utils/ktimetrans"

export default function ReffererCode() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const [total, setTotal] = useState(0)
  const [datas, setData] = useState()
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
      field: "refferer",
      headerName: "총판",

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
    { field: "count", headerName: "추천수", flex: 1, headerAlign: "center", align: "center" },
    { field: "code", headerName: "추천인 코드", flex: 1, headerAlign: "center", align: "center" },
    ,
    { field: "fn", headerName: "기능", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "createdAt",
      headerName: "발급 일시",
      flex: 1,
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
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={datas ? datas : []} checkbox={false} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.adminAddBox}>
          <h3>추천인 코드 추가</h3>
          <form className={styles.accountPannel}>
            <div className={styles.pannels}>
              <div className={styles.secondbox}>
                <FormLabel sx={{ color: "black", fontSize: "13px" }} htmlFor="adminId">
                  아이디
                </FormLabel>
                <input
                  placeholder="아이디 입력"
                  id="adminId"
                  className={styles.inputbox}
                  onChange={(event) => setInfoes({ ...info, username: event.target.value })}
                />
                <FormHelperText sx={{ fontSize: "10px" }}>*콤마(,) 구분해서 복수 입력 가능</FormHelperText>
              </div>
              <button className={styles.pannelbtn} onClick={handleSubmit}>
                추가하기
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
