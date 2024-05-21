import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "./custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import React, { useEffect, useState } from "react"
import styles from "./Status.module.css"
import { Checkbox } from "@mui/material"

function Status() {
  const columns = [
    { field: "createdAt", headerName: "가입일", flex: 1 },
    { field: "username", headerName: "아이디", flex: 1 },
    { field: "nickname", headerName: "닉네임", flex: 1 },
    { field: "name", headerName: "회원명", flex: 1 },
    { field: "phone", headerName: "폰번호", flex: 1 },
    { field: "entrance", headerName: "가입경로", flex: 1 },
    { field: "balance", headerName: "베팅캐쉬", flex: 1 },
    { field: "totalBalance", headerName: "총 충전 캐쉬", flex: 1 },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const { userList, callUserList } = getUserList()
  const [loading, setLoading] = useState(false)
  const [isCharged, setIsCharged] = useState()

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    //    callUserList()
    // console.log("userList", userList)
  }, [loading])

  return (
    <>
      <CustomHeader
        text={`가입현황 - [전체 : ${userList.length}]`}
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span className={styles.selectCheckbox}>
            <input
              type="checkbox"
              checked={isCharged}
              // onChange={onChangeCheckBox}
            />
            충전 하지 않은 회원
          </span>

          <span className={styles.selectCheckbox}>
            <input
              type="checkbox"
              checked={isCharged}
              // onChange={onChangeCheckBox}
            />
            베팅 하지 않은 회원
          </span>
        </div>
        <div style={{ width: "13%", height: "100%" }}>
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

export default Status
