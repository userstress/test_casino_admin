import React from "react"
import styles from "./MainInfoTable.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"

import { DataGridPro } from "@mui/x-data-grid-pro"

function MainInfoTable() {
  const columns = [
    { field: "lev", headerName: "번호", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "grade", headerName: "등급", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "userId", headerName: "총판 코드명", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "nick", headerName: "업체명", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "coupon", headerName: "하위 계약 조건", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "couponType",
      headerName: "본인 계약 조건",
      maxWidth: 153,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "buyPoint", headerName: "당일 충전금", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "standard", headerName: "당일 환전금", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "price", headerName: "당일 순이익", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "etc", headerName: "당일 본인 순이익", maxWidth: 153, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "adaptDate",
      headerName: "총 추천 회원수",
      maxWidth: 153,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
  ]
  const rows = [
    {
      id: 1,
      lev: "3",
      grade: "HM",
      userId: "eoanf49",
      nick: "또배기",
      coupon: "게임머니 교환",
      couponType: "1만",
      buyPoint: "11,000P",
      standard: "",
      price: "10,000",
      etc: "",
      adaptDate: "2022-08-22 오전 10:53:11",
      buyDate: "2022-08-22 오전 10:53:11",
      cancel: "",
    },
  ]

  const handleCellClick = () => {}

  return (
    <div className={styles.boxContainer}>
      <CustomHeader
        text={"하위 총판 당일 내역"}
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
          // onCellClick={(e) => handleCellClick(e)}
        />
      </div>
    </div>
  )
}

export default MainInfoTable
