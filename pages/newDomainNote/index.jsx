import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomEditor from "@components/customEditor/CustomEditor"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import React from "react"
import styles from "./index.module.css"

export default function index() {
  const columns = [
    { field: "domain", headerName: "도메인", width: 500, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "createdAt", headerName: "생성일", width: 500, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "cancel", headerName: "해제", width: 300, flex: 0.8, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      domain: "wd-1313.com",
      createdAt: "2020-09-04 오후 6:05:47",
      cancel: "해제",
    },
    {
      id: 2,
      domain: "wd-1313.com",
      createdAt: "2020-09-04 오후 6:05:47",
      cancel: "해제",
    },
    {
      id: 3,
      domain: "wd-1313.com",
      createdAt: "2020-09-04 오후 6:05:47",
      cancel: "해제",
    },
    {
      id: 4,
      domain: "wd-1313.com",
      createdAt: "2020-09-04 오후 6:05:47",
      cancel: "해제",
    },
  ]

  return (
    <>
      <CustomHeader text={"최근생성 도메인"} customStyle={{ height: "38px", width: "100%" }} />
      <CustomBar>
        <div className={styles.boxContainer1}>
          <div style={{ width: "15%" }}>도메인 :</div>
          <div className={styles.boxContainer3}>
            <CustomInput customStyle={{ width: "80%", backgroundColor: "#D9D9D9" }} />
            <CustomButton customStyle={{ width: "19%", backgroundColor: "#D9D9D9" }} text={"등록"} />
          </div>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} checkbox={false} />
      </div>

      <table className={styles.noticeDetailTable}>
        <colgroup>
          <col width={150}></col>
          <col width={1000}></col>
        </colgroup>

        <tbody>
          <tr style={{ height: "200px" }}>
            <td rowSpan={2} style={{ backgroundColor: "#181D4B", color: "white" }}>
              쪽지내용
            </td>
            <td>
              <CustomEditor
                wrapperStyle={{ height: "200px", backgroundColor: "#181D4B" }}
                editorStyle={{ height: "158px", border: "1px solid white", color: "white" }}
                toolbarStyle={{ marginBottom: "0px", backgroundColor: "#181D4B", color: "black" }}
              />
            </td>
          </tr>
          <tr>
            <td style={{ backgroundColor: "#181D4B" }}>
              <div className={styles.btnWrapper}>
                <CustomSelect
                  optionArr={["전체"]}
                  customStyle={{ backgroundColor: "#D9D9D9", width: "15%", marginRight: "10px" }}
                />
                <CustomButton
                  customStyle={{ width: "5%", backgroundColor: "#D9D9D9", color: "black", height: "21px" }}
                  fontStyle={{ fontSize: "0.781vw" }}
                  text={"검색"}
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </>
  )
}

// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
