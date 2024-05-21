import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "./custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import React, { useEffect, useState } from "react"
import styles from "./SettleInfo.module.css"

function SettleInfo() {
  const columns = [
    { field: "username", headerName: "아이디", flex: 1 },
    { field: "nickname", headerName: "닉네임", flex: 1 },
    { field: "name", headerName: "회원명", flex: 1 },
    { field: "code", headerName: "코드", flex: 1 },
    { field: "createdAt", headerName: "가입일", flex: 1 },
    { field: "charge", headerName: "충전금", flex: 1 },
    { field: "exchage", headerName: "환전금", flex: 1 },
    { field: "last", headerName: "순이익", flex: 1 },
    { field: "lastcharge", headerName: "마지막 충전", flex: 1 },
    { field: "lastconnection", headerName: "마지막 접속일", flex: 1 },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const { userList, callUserList } = getUserList()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    //    callUserList()
    console.log("userList", userList)
  }, [loading])
  const nums = 0

  return (
    <>
      <CustomHeader text={`회원별  관리`} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div className={styles.titlesbo}>전체:{nums}</div>
        <div style={{ width: "13%", height: "100%", marginLeft: "23%" }}>
          <DatePickerComponent text={"시작일자"} />
        </div>
        <div style={{ width: "13%", height: "100%", marginLeft: "0.5vw" }}>
          <DatePickerComponent text={"종료일자"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} checkbox={false} rows={userList} />
      </div>
    </>
  )
}

export default SettleInfo