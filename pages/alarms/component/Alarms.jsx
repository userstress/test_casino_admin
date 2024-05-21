import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./Alarms.module.css"

export default function Alarms() {
  const columns = [
    { field: "id", headerName: "No." },
    { field: "name", headerName: "알람이름", flex: 1 },
    { field: "alramName", headerName: "알람이름", flex: 1 },
    { field: "number", headerName: "미처리숫자", flex: 1 },
    {
      field: "save",
      headerName: "저장",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          console.log(`Cell clicked: ${params.value}`)
          return window.open("/getUserInfoes", "유저 정보", "width=1024, height=860")
        }

        return (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#0000FF",
              color: "white",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
          >
            저장
          </button>
        )
      },
    },
    {
      field: "upload",
      headerName: "업로드",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          console.log(`Cell clicked: ${params.value}`)
          return window.FileReader.call()
        }

        return (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "red",
              color: "white",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
          >
            업로드
          </button>
        )
      },
    },
  ]
  const rows = [
    {
      id: 1,
      number: "3",
      number: "2",
      name: "eoanf49",
      alramName: "아구찜집사장",
    },
  ]

  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"사이트 알람 관리 ( 전체 : 16 )"} customStyle={{ height: "1.979vw", width: "100%" }} />

      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
    </div>
  )
}
