import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./ExpiredUserInfoList.module.css"

export default function ExpiredUserInfoList() {
  const columns = [
    { field: "id" },
    { field: "level", headerName: "Lv", flex: 0.7, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "아이디", flex: 1, headerAlign: "center", align: "center" },
    { field: "nickname", headerName: "닉네임", flex: 1, headerAlign: "center", align: "center" },
    { field: "agency", headerName: "총판", flex: 1, headerAlign: "center", align: "center" },
    { field: "market", headerName: "매장", flex: 1, headerAlign: "center", align: "center" },
    { field: "phoneNumber", headerName: "연락처", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingMoney", headerName: "베팅머니", flex: 1, headerAlign: "center", align: "right" },
    { field: "point", headerName: "포인트", flex: 1, headerAlign: "center", align: "right" },
    { field: "deposit ", headerName: "입금", flex: 1, headerAlign: "center", align: "right" },
    { field: "withdraw ", headerName: "출금", flex: 1, headerAlign: "center", align: "right" },
    { field: "calculate", headerName: "정산", flex: 1, headerAlign: "center", align: "right" },
    { field: "login", headerName: "로그인", flex: 1, headerAlign: "center", align: "center" },
    { field: "chargeCount", headerName: "충전횟수", flex: 1, headerAlign: "center", align: "center" },
    { field: "regDate", headerName: "등록일", flex: 1.8, headerAlign: "center", align: "center" },
    { field: "lastLogDate", headerName: "마지막로그일", flex: 1.8, headerAlign: "center", align: "center" },
    { field: "lastChargeDate", headerName: "마지막충전일", flex: 1.8, headerAlign: "center", align: "center" },
    { field: "domain", headerName: "도메인", flex: 1, headerAlign: "center", align: "center" },
    { field: "state", headerName: "상태", flex: 1, headerAlign: "center", align: "center" },
    {
      field: "log",
      headerName: "로그",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          console.log(`Cell clicked: ${params.value}`)
          return alert("로그")
        }

        return (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#e5e5e5",
              width: "50px",
              margin: "0% auto",
              color: "black",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
          >
            로그
          </button>
        )
      },
    },
    {
      field: "note",
      headerName: "쪽지",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handleClick = (event, count) => {
          return window.open(`/sendingNote?userId=${params.row.user.id}`, "쪽지", "width=1024, height=500")
        }

        return (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#e5e5e5",
              width: "50px",
              margin: "0% auto",
              color: "black",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
          >
            쪽지
          </button>
        )
      },
    },
    {
      field: "delete",
      headerName: "삭제",
      flex: 1,
      headerAlign: "center",
      align: "center",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          console.log(`Cell clicked: ${params.value}`)
          return alert("삭제")
        }

        return (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#e5e5e5",
              width: "50px",
              margin: "0% auto",
              color: "black",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
          >
            삭제
          </button>
        )
      },
    },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const rows = [{ id: 1, level: 1, userId: "user4" }]
  return (
    <>
      <CustomHeader
        text={"탈퇴회원 정보 - [총 인원 : 384명]"}
        customStyle={{ height: "1.979vw", width: "100%", fontWeight: 400 }}
      />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div style={{ width: "13%", height: "100%" }}>
          <DatePickerComponent text={"시작일자"} customStyle={{ justifyContent: "space-around" }} />
        </div>
        <div style={{ width: "13%", height: "100%" }}>
          <DatePickerComponent text={"종료일자"} customStyle={{ justifyContent: "space-around" }} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={rows} />
      </div>
    </>
  )
}
