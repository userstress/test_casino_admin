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
import DSTLayout from "@components/DSTC/DSTLayout/DSTLayout"

export default function index() {
  const columns = [
    { field: "userID", headerName: "아이디", flex: 1, headerAlign: "center", align: "center" },
    { field: "recUserId", headerName: "쪽지", flex: 1, headerAlign: "center", align: "center" },
    { field: "site", headerName: "지급회수", flex: 1, headerAlign: "center", align: "center" },
    { field: "gameCount", headerName: "보유머니", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingType ", headerName: "포인트", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingList ", headerName: "금일 입금", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingRate", headerName: "금일 출금", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingMoney", headerName: "총 입금", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingResultMoney", headerName: "총 출금", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingTime", headerName: "총 손익", flex: 1, headerAlign: "center", align: "center" },
    { field: "resultTime", headerName: "가입일", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingIP", headerName: "접속", flex: 1, headerAlign: "center", align: "center" },
    { field: "bettingOS", headerName: "접속실패", flex: 1, headerAlign: "center", align: "center" },
    { field: "result", headerName: "Kick", flex: 1, headerAlign: "center", align: "center" },
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const rows = []

  const { resultsData, callUnmatchedResultData } = getResults()

  const callResults = (data) => {
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
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <div>회원 목록</div>
            <div style={{ display: "flex", columnGap: "5px" }}>
              <div
                style={{
                  width: "170px",
                  height: "34px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                가입 : 0
              </div>
              <div
                style={{
                  width: "170px",
                  height: "34px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                입금 : 0
              </div>
              <div
                style={{
                  width: "170px",
                  height: "34px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                출금 : 0
              </div>
              <div
                style={{
                  width: "170px",
                  height: "34px",
                  border: "1px solid white",
                  borderRadius: "5px",
                  fontSize: "15px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                문의 : 0
              </div>
            </div>
          </div>
        }
        customStyle={{
          height: "1.979vw",
          width: "100%",
          backgroundColor: "black",
          color: "#FFA700",
          fontSize: "20px",
          borderTop: "1px solid white",
          borderBottom: "1px solid white",
        }}
      />
      <CustomBar
        customStyle={{
          padding: "0.260vw 0",
          backgroundColor: "#5386B5",
          justifyContent: "flex-end",
          paddingRight: "5px",
        }}
      >
        <CustomButton
          text={"멤버추가"}
          customStyle={{
            width: "110px",
            backgroundColor: "#FF0000",
            borderRadius: "5px",
            color: "white",
            marginRight: "5px",
          }}
        />
        <CustomSelect
          customStyle={{
            width: "100px",
            marginRight: "5px",
            backgroundColor: "#008000",
            borderRadius: "5px",
            color: "white",
            marginRight: "5px",
          }}
          optionArr={["정상", "대기", "정지"]}
        />
        <CustomInput
          customStyle={{ width: "7.865vw", fontSize: "190px", backgroundColor: "white", marginRight: "5px" }}
        />
        <CustomButton
          text={"검색"}
          customStyle={{ width: "60px", backgroundColor: "#3342C9", borderRadius: "5px", color: "white" }}
        />
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={rows} />
      </div>
    </>
  )
}

// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <DSTLayout>{page}</DSTLayout>
}
