// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./PopupList.module.css"
import { useRouter } from "next/router"
export default function PopupList() {
  const router = useRouter()

  const columns = [
    { field: "id", headerName: "번호", flex: 1, type: "number", headerAlign: "center", align: "center" },
    {
      field: "title",
      headerName: "제목",
      flex: 5,
      headerAlign: "center",
      align: "left",
      renderCell: (params) => {
        return <div onClick={() => router.push(`/customer/popup/${params.row.id}`)}>{params.formattedValue}</div>
      },
    },
    { field: "width", headerName: "가로사이즈", flex: 2, headerAlign: "center", align: "center" },
    { field: "height", headerName: "세로사이즈", flex: 2, headerAlign: "center", align: "center" },
    { field: "state", headerName: "상태", flex: 1, headerAlign: "center", align: "center" },
  ]
  const rows = [
    { id: 1, title: "3월 통큰 이벤트", width: "400픽셀", height: "375픽셀", state: "노출" },
    { id: 2, title: "4월 통큰 이벤트", width: "400픽셀", height: "375픽셀", state: "노출" },
    { id: 3, title: "5월 통큰 이벤트", width: "400픽셀", height: "375픽셀", state: "노출" },
    { id: 4, title: "6월 통큰 이벤트", width: "400픽셀", height: "375픽셀", state: "노출" },
    { id: 5, title: "7월 통큰 이벤트", width: "400픽셀", height: "375픽셀", state: "노출" },
  ]
  return (
    <>
      <CustomHeader text={"팝업"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar customStyle={{ justifyContent: "center" }}>
        <div className={styles.customBarInner}>
          <div className={styles.inputInner}>
            <div style={{ width: "28%" }}>게시형식</div>
            <CustomSelect optionArr={["전체"]} customStyle={{ backgroundColor: "#D9D9D9", width: "75%" }} />
          </div>
          <div className={styles.inputInner}>
            <div style={{ width: "28%" }}>리스트 수</div>
            <CustomSelect optionArr={["20개", "30개"]} customStyle={{ backgroundColor: "#D9D9D9", width: "75%" }} />
          </div>
          <CustomButton
            customStyle={{ width: "9.1%", backgroundColor: "#D9D9D9", color: "black" }}
            fontStyle={{ fontSize: "0.781vw" }}
            text={"검색"}
          />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerSecondRowContainer}>
          <div className={styles.footerSecondRowButtons}>
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#3B4281", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"등록"}
            />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#3B4281", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"비노출"}
            />
            <CustomButton
              customStyle={{ width: "33%", backgroundColor: "#AC2E2E", color: "white" }}
              fontStyle={{ fontSize: "0.6vw" }}
              text={"완전삭제"}
            />
          </div>
          <div className={styles.footerSecondRowInput}>
            <button
              style={{ width: "33%", backgroundColor: "#AC2E2E", color: "white" }}
              onClick={() => router.push("/customer/popup/new")}
            >
              팝업 등록
            </button>
          </div>
        </div>
        <div></div>
      </div>
    </>
  )
}
