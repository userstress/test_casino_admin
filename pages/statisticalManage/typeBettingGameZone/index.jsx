import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./index.module.css"
import Layout from "@components/Layout"

export default function index() {
  const columns = [
    { field: "id", headerName: "번호", flex: 1, headerAlign: "center", align: "center" },
    { field: "date", headerName: "날짜", flex: 2, headerAlign: "center", align: "center" },
    { field: "silBetting", headerName: "실(베팅)", flex: 2, headerAlign: "center", align: "center" },
    { field: "silWon", headerName: "실(당첨)", flex: 2, headerAlign: "center", align: "center" },
    { field: "percent1", headerName: "%", flex: 2, headerAlign: "center", align: "center" },
    { field: "sunBetting", headerName: "해(베팅)", flex: 2, headerAlign: "center", align: "center" },
    { field: "sunWon", headerName: "해(당첨)", flex: 2, headerAlign: "center", align: "center" },
    { field: "percent2", headerName: "%", flex: 2, headerAlign: "center", align: "center" },
    { field: "KBetting", headerName: "크(베팅)", flex: 2, headerAlign: "center", align: "center" },
    { field: "KWon", headerName: "크(당첨)", flex: 2, headerAlign: "center", align: "center" },
    { field: "percent3", headerName: "%", flex: 2, headerAlign: "center", align: "center" },
    { field: "wonBetting", headerName: "승(베팅)", flex: 2, headerAlign: "center", align: "center" },
    { field: "wonWon", headerName: "승(당첨)", flex: 2, headerAlign: "center", align: "center" },
    { field: "percent4", headerName: "%", flex: 2, headerAlign: "center", align: "center" },
    { field: "henBetting", headerName: "핸(베팅)", flex: 2, headerAlign: "center", align: "center" },
    { field: "panWon", headerName: "판(당첨)", flex: 2, headerAlign: "center", align: "center" },
    { field: "percent5", headerName: "%", flex: 2, headerAlign: "center", align: "center" },
    { field: "SBetting", headerName: "스(베팅)", flex: 2, headerAlign: "center", align: "center" },
    { field: "SWon", headerName: "스(당첨)", flex: 2, headerAlign: "center", align: "center" },
    { field: "percent6", headerName: "%", flex: 2, headerAlign: "center", align: "center" },

    
  ]
  const rows = []
  return (
    <>
      <CustomHeader
        text={
          <div style={{width:'80%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
            <div style={{width:'22%',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <div>타입별 베팅 현황[게임존][IN]</div>
              <button>새로고침</button>
            </div>
            <DatePickerComponent customStyle={{width:'8vw'}}/>
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} />
      </div>
      <div className={styles.footerContainer}>
        <CustomButton
          customStyle={{ width: "8%", height: "100%", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"등록"}
        />
        <CustomButton
          customStyle={{ width: "8%", height: "100%", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"삭제"}
        />
      </div>
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
