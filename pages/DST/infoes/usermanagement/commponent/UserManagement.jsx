import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "./custombar/CustomBar"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import React, { useEffect, useState } from "react"
import styles from "./UserManagement.module.css"

function UserManagement() {
  const columns = [
    { field: "username", headerName: "아이디", flex: 1 },
    { field: "nickname", headerName: "닉네임", flex: 1 },
    { field: "name", headerName: "회원명", flex: 1 },
    { field: "code", headerName: "코드", flex: 1 },
    { field: "phone", headerName: "폰번호", flex: 1 },
    { field: "createdAt", headerName: "가입일", flex: 1 },
    { field: "lastEntered", headerName: "최근접속일", flex: 1 },
    { field: "ip", headerName: "최근접속 ip", flex: 1 },
    { field: "entrance", headerName: "가입경로", flex: 1 },
    { field: "recententrance", headerName: "최근경로", flex: 1 },
    { field: "cash", headerName: "보유캐쉬", flex: 1 },
    { field: "point", headerName: "보유포인트", flex: 1 },
    { field: "balance", headerName: "베팅캐쉬", flex: 1 },
    { field: "totalBalance", headerName: "총 충전 캐쉬", flex: 1 },
    { field: "totalExchange", headerName: "총 환전 캐쉬", flex: 1 },
    { field: "profit", headerName: "이익", flex: 1 },
    {
      field: "totalExchange",
      headerName: "베팅내역",
      flex: 1,
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          console.log(`Cell clicked: ${params.value}`)
          return window.open("/getUserInfoes", "내역", "width=1024, height=860")
        }

        return (
          <div onClick={handleClick} style={{ cursor: "pointer", width: "2vw", height: "1vw" }}>
            내역
          </div>
        )
      },
    },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const { userList, callUserList } = getUserList()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    //    callUserList()
  }, [loading])

  return (
    <>
      <CustomHeader
        text={`통합 회원 > 관리 - [총인원 : ${userList?.length}명]`}
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
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

export default UserManagement
