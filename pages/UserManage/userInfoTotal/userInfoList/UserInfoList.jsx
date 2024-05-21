import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getUserList } from "@utils/user/getUserList"
import { useEffect, useState } from "react"
import styles from "./UserInfoList.module.css"
import rendercellCopy from "@utils/Tables/rendercellCopy"
import { addCommasToNumber3 } from "@utils/formatNumberWithCommas"
import DayTransformMinit from "@utils/DayTransformMinit"
import { useAuthStore } from "@utils/useAuthStore"
//17 회원 정보
export default function UserInfoList() {
  //style={{ cursor: "pointer" }}

  const customStyle = { paddingRight: "4px" }

  const columns = [
    { field: "lv", headerName: "Lv", minWidth: 28, maxWidth: 28, align: "center" },
    { field: "username", headerName: "아이디", width: 80, align: "center", renderCell: rendercellCopy() },
    { field: "nickname", headerName: "닉네임", width: 75, align: "center" },
    {
      field: "balance",
      type: "number",
      headerName: "보유머니",
      width: 90,
      align: "right",
      // params: 해당 row레코드의 정보가 담김.
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          return window.open("/getUserInfoes", "유저 정보", "width=1024, height=860")
        }
        return (
          <div onClick={handleClick} style={customStyle}>
            {params.value ? addCommasToNumber3(params.value) : 0}
          </div>
        )
      },
    },
    {
      field: "deposit ",
      type: "number",
      headerName: "입금",
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "withdraw ",
      type: "number",
      headerName: "출금",
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "calculate",
      headerName: "정산",
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    { field: "chargeCount", headerName: "충전횟수", maxWidth: 80, algin: "center" },
    {
      field: "point",
      type: "number",
      headerName: "스베팅(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "totalsettle",
      type: "number",
      headerName: "스정산(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "gebetting",
      type: "number",
      headerName: "게베팅(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "gesettle",
      type: "number",
      headerName: "게정산(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "sabetting",
      type: "number",
      headerName: "사베팅(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "sasettle",
      type: "number",
      headerName: "사정산(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "yubetting",
      type: "number",
      headerName: "유베팅(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "yusettle",
      type: "number",
      headerName: "유정산(총)",
      flex: 1,
      maxWidth: 80,
      algin: "right",
      renderCell: (params) => {
        return <div style={customStyle}>{params.formattedValue}</div>
      },
    },
    {
      field: "lastChargeDate",
      headerName: "최근충전일",
      maxWidth: 130,
      minWidth: 120,
      align: "center",
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "lastVisit",
      headerName: "최근로그인",
      maxWidth: 130,
      minWidth: 120,
      align: "center",
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "lastbet",
      headerName: "최근베팅일",
      maxWidth: 130,
      minWidth: 120,
      align: "center",
      renderCell: (params) => {
        return <div>{DayTransformMinit(params.formattedValue)}</div>
      },
    },
    {
      field: "enabled",
      headerName: "상태",
      width: 30,

      align: "center",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          return window.open("/getUserInfoes", "유저 정보", "width=1024, height=860")
        }

        return <div>{params.value ? "정상" : "대기"}</div>
      },
    },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const { userList, callUserList } = getUserList()
  const [loading, setLoading] = useState(false)
  const { userToken } = useAuthStore()

  useEffect(() => {
    setLoading(true)
  }, [])

  useEffect(() => {
    callUserList(userToken)
  }, [loading])

  return (
    <>
      <CustomHeader
        text={`회원관리(종합)-[총인원 : ${userList?.length}명]`}
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent
            text={"시작일자 :"}
            customStyle={{ backgroundColor: "white", justifyContent: "space-around" }}
          />
        </div>
        &nbsp;&nbsp;&nbsp;~&nbsp;&nbsp;&nbsp;
        <div style={{ width: "16%", height: "100%" }}>
          <DatePickerComponent text={"종료일자 :"} customStyle={{ justifyContent: "space-around" }} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={userList} />
      </div>
    </>
  )
}
