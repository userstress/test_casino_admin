import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./index.module.css"
import Layout from "@components/Layout"
import { useEffect, useState } from "react"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"

export default function index() {
  const { sendRequest } = useAxiosRequest()
  const [list, setList] = useState([])

  const columns = [
    { field: "leagueId", headerName: "번호", flex: 1, headerAlign: "center", align: "center" },
    { field: "image", headerName: "이미지", flex: 3, headerAlign: "center", align: "center" },
    { field: "name", headerName: "종목", flex: 10, headerAlign: "center", align: "center" },
  ]

  function requestList() {
    const method = "GET"
    const url = `https://dailymodelapp.com/leagues`

    sendRequest(method, url, null, null, (errorStatus, responseData) => {
      if (!errorStatus && responseData) {
        const result = responseData.data
        setList(result)
      }
      return false
    })
  }

  useEffect(() => {
    requestList()
  }, [])

  return (
    <>
      <CustomHeader
        text={
          <div>
            게임 종목관리&nbsp;{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>{" "}
            &nbsp;게임 리그 리스트
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%" }}
      />
      <CustomBar customStyle={{ width: "50%", justifyContent: "center" }}>
        <div className={styles.boxInner}>
          <CustomButton
            text={"종목구분"}
            customStyle={{ color: "white", width: "6.250vw", backgroundColor: "#696969" }}
          />
          <CustomSelect customStyle={{ width: "9.375vw" }} optionArr={["전체보기"]} />
          <div className={styles.boxContainer1}>
            <div>리그명 :</div>
            <CustomInput customStyle={{ width: "8vw", backgroundColor: "#D9D9D9" }} />
            <CustomButton customStyle={{ color: "white", width: "4vw", backgroundColor: "#696969" }} text={"검색"} />
          </div>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={list} />
      </div>
      <div className={styles.footerContainer}>
        <CustomButton
          customStyle={{ width: "8%", height: "100%", backgroundColor: "#3B4281", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"등록"}
        />
        <CustomButton
          customStyle={{ width: "8%", height: "100%", backgroundColor: "#AC2E2E", color: "white" }}
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
