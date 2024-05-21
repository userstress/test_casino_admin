import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "./custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import React, { useEffect, useState } from "react"
import styles from "./SearchList.module.css"

function SearchList() {
  const columns = [
    { field: "startsDay", headerName: "시작일", flex: 1 },
    { field: "endDay", headerName: "마감일", flex: 1 },
    { field: "delayamounts", headerName: "이월금액", flex: 1 },
    { field: "totalamounts", headerName: "정산금액", flex: 1 },
    { field: "types", headerName: "타입", flex: 1 },
    { field: "balance", headerName: "실수령", flex: 1 },
    { field: "contract", headerName: "계약조건", flex: 1 },
    { field: "memo", headerName: "메모", flex: 1 },
    { field: "transcatedDay", headerName: "처리일자", flex: 1 },
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
      <CustomHeader text={`정산 내역 관리`} customStyle={{ height: "1.979vw", width: "100%" }} />
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

export default SearchList
