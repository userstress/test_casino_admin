import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import { getResults } from "@utils/getResults"
import axios from "axios"
import { useEffect } from "react"
import styles from "./index.module.css"

export default function index() {
  const columns = [
    { field: "id", headerName: "No.", flex: 1, headerAlign: "center", align: "center" },
    { field: "level", headerName: "Lv", flex: 0.7, headerAlign: "center", align: "center" },
    { field: "rank", headerName: "등급", flex: 1, headerAlign: "center", align: "center" },
    { field: "userID", headerName: "아이디", flex: 1, headerAlign: "center", align: "center" },
    { field: "recUserId", headerName: "추천아이디", flex: 1, headerAlign: "center", align: "center" },
    { field: "site", headerName: "사이트", flex: 1, headerAlign: "center", align: "center" },
    { field: "gameCount", headerName: "게임수", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingType ", headerName: "베팅종목", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingList ", headerName: "베팅진행내역", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingRate", headerName: "배당율", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingMoney", headerName: "베팅액", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingResultMoney", headerName: "배당적중금", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingTime", headerName: "베팅시간", flex: 1, headerAlign: "center", align: "center" },
    { field: "resultTime", headerName: "결과시간", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingIP", headerName: "베팅아이피", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingOS", headerName: "베팅구분", flex: 1, headerAlign: "center", align: "center" },
    { field: "result", headerName: "결과", flex: 1, headerAlign: "center", align: "center" },
    { field: "detail", headerName: "상세", flex: 1, headerAlign: "center", align: "center" },
    { field: "cancle", headerName: "취소", flex: 1, headerAlign: "center", align: "center" },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const rows = []

  const { resultsData, callUnmatchedResultData } = getResults()

  const callResults = (data) => {
    console.log("data", data)
    axios
      .post("/api/proxy/getResults", data)
      .then(async (res) => {
        console.log("res", res.data.data)
      })
      .catch((error) => {
        console.error("Error while making the request:", error)
      })
  }

  useEffect(() => {
    callUnmatchedResultData()
  }, [])

  useEffect(() => {
    resultsData.map((item, idx) => {
      callResults(item)
    })
  }, [resultsData])

  return (
    <>
      <CustomHeader
        text={
          <div>
            게임관리&nbsp;{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>{" "}
            &nbsp;베팅 리스트
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ padding: "0.260vw 0" }}>
        <div className={styles.boxContainer1}>
          <div style={{}}>종류 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer1}>
          <div>종목명 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer5}>
          <input type="checkbox" />
          <label htmlFor="">결과시간</label>
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
        <CustomSelect
          optionArr={["선택"]}
          customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
        />
        <div className={styles.boxContainer1}>
          <div>총판명 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer1}>
          <div>매장명 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer1}>
          <div>레벨 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <CustomSelect
          optionArr={["선택"]}
          customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
        />
        <CustomInput customStyle={{ width: "7.865vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }} />
        <div className={styles.boxContainer1}>
          <div>매장명 :</div>
          <CustomSelect
            optionArr={["전체"]}
            customStyle={{ width: "3vw", fontSize: "0.781vw", backgroundColor: "#D9D9D9" }}
          />
        </div>
        <div className={styles.boxContainer7}>
          <CustomButton text={"검색"} customStyle={{ width: "2vw", backgroundColor: "#D9D9D9" }} />
          <CustomButton text={"쪽지보내기"} customStyle={{ width: "4.1vw", backgroundColor: "#D9D9D9" }} />
          <CustomButton text={"모두펼치기"} customStyle={{ width: "4.1vw", backgroundColor: "#D9D9D9" }} />
        </div>
        {/* <div className={styles.boxContainer1}>
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
        </div> */}
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={rows} />
      </div>
    </>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
