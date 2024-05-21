import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomInput from "@components/customInput/CustomInput"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import datePickerTrans from "@utils/REST/LIST/datePickerTrans"
import { useEffect, useState } from "react"
import BetListCasino from "./components/BetListCasino"

const customeBarInnerStyle = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  fontSize: "15px",
  fontWeight: "700",
}

const customSelectStyle = {
  backgroundColor: "black",
  width: "100px",
  marginRight: "5px",
  borderRadius: "5px",
  color: "#00F",
  marginRight: "5px",
  border: "1px solid #00F",
  fontWeight: "700",
}

export default function index() {
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]
  const [datepick, setDate] = useState({ start: formattedDate, end: formattedDate })
  const [onSelect, setSelect] = useState("slot")

  const handleStartDateChange = (startDate) => {
    setDate({ ...datepick, start: datePickerTrans(startDate) })
    // console.log(startDate)
  }

  const handleEndDateChange = (endDate) => {
    setDate({ ...datepick, end: datePickerTrans(endDate) })
    // console.log(endDate)
  }

  return (
    <>
      <CustomBar customStyle={{ backgroundColor: "#5386b5", color: "white" }}>
        {" "}
        {/* <div style={customeBarInnerStyle}>
          <CustomSelect customStyle={customSelectStyle} optionArr={["카지노"]} />
          <DatePickerComponent
            // text={"시작일자:"}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
            getDate={handleStartDateChange}
          />
          <DatePickerComponent
            // text={"종료일자:"}
            customStyle={{ width: "300px", justifyContent: "space-around" }}
            getDate={handleEndDateChange}
          />
        </div> */}
        카지노 베팅 로그
      </CustomBar>
      <BetListCasino />
    </>
  )
}

// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
