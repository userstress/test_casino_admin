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
    { field: "id", headerName: "No.", flex: 1, headerAlign: "center", align: "center" },
    { field: "level", headerName: "Lv", flex: 0.7, headerAlign: "center", align: "center" },
    { field: "rank", headerName: "등급", flex: 1, headerAlign: "center", align: "center" },
    { field: "userID", headerName: "아이디", flex: 1, headerAlign: "center", align: "center" },
    { field: "nickname", headerName: "닉네임", flex: 1, headerAlign: "center", align: "center" },
    { field: "agency", headerName: "총판", flex: 1, headerAlign: "center", align: "center" },
    { field: "myMoney", headerName: "보유머니", flex: 1, headerAlign: "center", align: "center" },
    { field: "deposit ", headerName: "입금", flex: 1, headerAlign: "center", align: "center" },
    { field: "withdraw ", headerName: "출금", flex: 1, headerAlign: "center", align: "center" },
    { field: "calculate", headerName: "정산", flex: 1, headerAlign: "center", align: "center" },
    { field: "sBetting", headerName: "스베팅(총)", flex: 1, headerAlign: "center", align: "center" },
    { field: "sBettingWon", headerName: "스당첨(총)", flex: 1, headerAlign: "center", align: "center" },
    { field: "sCalculate", headerName: "스정산(총)", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingSil", headerName: "베팅(실)", flex: 1, headerAlign: "center", align: "center" },
    { field: "wonSil", headerName: "당첨(실)", flex: 1, headerAlign: "center", align: "center" },
    { field: "calSil", headerName: "정산(실)", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingSun", headerName: "베팅(해)", flex: 1, headerAlign: "center", align: "center" },
    { field: "wonSun", headerName: "당첨(해)", flex: 1, headerAlign: "center", align: "center" },
    { field: "calSun", headerName: "정산(해)", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingK", headerName: "베팅(크)", flex: 1, headerAlign: "center", align: "center" },
    { field: "wonK", headerName: "당첨(크)", flex: 1, headerAlign: "center", align: "center" },
    { field: "calK", headerName: "정산(크)", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingWon", headerName: "베팅(승)", flex: 1, headerAlign: "center", align: "center" },
    { field: "wonWon", headerName: "당첨(승)", flex: 1, headerAlign: "center", align: "center" },
    { field: "calWon", headerName: "정산(승)", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingHen", headerName: "베팅(핸)", flex: 1, headerAlign: "center", align: "center" },
    { field: "wonHen", headerName: "당첨(핸)", flex: 1, headerAlign: "center", align: "center" },
    { field: "calHen", headerName: "정산(핸)", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingS", headerName: "베팅(스)", flex: 1, headerAlign: "center", align: "center" },
    { field: "wonS", headerName: "당첨(스)", flex: 1, headerAlign: "center", align: "center" },
    { field: "calS", headerName: "정산(스)", flex: 1, headerAlign: "center", align: "center" },
    { field: "state", headerName: "상태", flex: 1, headerAlign: "center", align: "center" },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const rows = []
  return (
    <>
      <CustomHeader text={"회원관리 - [총 인원 : 10037명]"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div className={styles.boxContainer1}>
          <div>회원등급 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "4.608vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer1}>
          <div>회원상태 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "4.608vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"시작일자 :"}
          />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "3.8vw", textAlign: "center" }}
            text={"종료일자 :"}
          />
        </div>
        <div className={styles.boxContainer1}>
          <div>총판명 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "5.208vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer1}>
          <div>매장명 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "5.208vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer3}>
          <CustomSelect
            optionArr={["닉네임"]}
            customStyle={{ width: "3.906vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
          <CustomInput customStyle={{ width: "7.865vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }} />
          <CustomButton text={"검색"} customStyle={{ width: "2.5vw", backgroundColor: "#D9D9D9" }} />
        </div>
        <div className={styles.boxContainer4}>
          <CustomButton text={"엑셀저장"} customStyle={{ width: "4.1vw", backgroundColor: "#D9D9D9" }} />
          <CustomButton text={"텍스트저장"} customStyle={{ width: "4.1vw", backgroundColor: "#D9D9D9" }} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={rows} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerFirstRowContainer}>
          <div className={styles.footerFirstRowInner}>
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"정상"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"정지"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"하락탈퇴"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"악의"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴1"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴2"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"탈퇴3"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"불량"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"단폴"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"배당"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#6A99C5", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"호원"}
            />
            <CustomButton
              customStyle={{ width: "8%", backgroundColor: "#964242", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"고액"}
            />
          </div>
        </div>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#3E54A5", color: "black" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"회원등록"}
            />
          </div>
          <div className={styles.footerSecondRowInput}>
            <CustomButton
              customStyle={{ width: "49%", backgroundColor: "#FFBB3E", color: "black" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"추천 가능"}
            />
            <CustomButton
              customStyle={{ width: "49%", backgroundColor: "#FFBB3E", color: "black" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"추천 불가능"}
            />
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
