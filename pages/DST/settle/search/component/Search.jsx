import React from "react"
import styles from "./Search.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"

import { DataGridPro } from "@mui/x-data-grid-pro"

function Search() {
  const columns = [
    { field: "number", headerName: "번호", flex: 1 },
    { field: "class", headerName: "등급", maxWidth: 153, flex: 1 },
    { field: "code", headerName: "총판 코드명", flex: 1 },
    { field: "name", headerName: "업체명", flex: 1 },
    { field: "ownContract", headerName: "본인 계약 조건", flex: 1 },
    { field: "contract", headerName: "하위 계약 조건", flex: 1 },
    { field: "charge", headerName: "누적 충전금", flex: 1 },
    { field: "exchange", headerName: "누적 환전금", flex: 1 },
    { field: "pureprofit", headerName: "누적 순이익", flex: 1 },
    { field: "own", headerName: "본인 순이익", flex: 1 },
  ]
  const rows = [
    {
      id: 1,
      exchage: "11,000",
      exchage1: "10,000",
      recharge: "10,000",
      profit: "5000",
      day: "2022-08-22 오전 10:53:11",
      listof: "",
    },
  ]
  const sellInfo = [
    { pname: "충전 금액", pvalue: "7,055,000원" },
    { pname: "환전 금액", pvalue: "6,240,000원" },
    { pname: "충전-환전 지분율", pvalue: "(7,055,000원 - 6,240,000원) X (하부 적용)%=326,000원" },
    { pname: "TOTAL", pvalue: "326,000원" },
  ]
  return (
    <>
      <div className={styles.tablewrapper}>
        <div className={styles.titles}>총판 정보</div>
        <div className={styles.datePick}>
          <DatePickerComponent className={styles.customCalendar} customStyle={{ width: "300px" }} />
          <p>~</p>
          <DatePickerComponent className={styles.customCalendar} customStyle={{ width: "300px" }} />
        </div>

        <section className={styles.tablebox}>
          {sellInfo.map((ar) => {
            return (
              <div className={styles.tables}>
                <div className={styles.tableLeft}>{ar.pname}</div>
                <div className={styles.tableRight}>{ar.pvalue}</div>
              </div>
            )
          })}
        </section>
      </div>
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"하위 총판 정보"}
          customStyle={{ display: "flex", justifyContent: "center", height: "1.979vw", width: "100%" }}
        />
        <div className={styles.tableContainer}>
          <DataGridPro
            className={styles.gridmaincustom}
            sx={{
              width: "100%",
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "#696969",
                color: "white",
              },

              "& .MuiButtonBase-root": {
                color: "black",
              },
              "& .MuiDataGrid-cell": {
                paddingLeft: "16px",
              },
              "& .MuiDataGrid-cellCheckbox": {
                paddingLeft: "0px",
              },
              ".MuiTablePagination-actions svg ": {
                color: "black",
              },
            }}
            showCellVerticalBorder
            showColumnVerticalBorder
            rowHeight={22} // 행 높이를 10%로 설정
            columnHeaderHeight={22} // 헤더 높이를 5%로 설정
            autoHeight={true}
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 1, pageSize: 1 },
              },
            }}
            pageSizeOptions={[1]}
            pagination
            onCellClick={(e) => handleCellClick(e)}
          />
        </div>
      </div>
    </>
  )
}

export default Search
