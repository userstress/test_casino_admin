const colorSx = {
  width: "100%",
  "& .isWin": {
    backgroundColor: "#FFD70080  !important",
    color: "black",
  },
  "& .isH": {
    backgroundColor: "#87CEEB  !important",
    color: "black",
  },
  "& .MuiDataGrid-row:hover": {
    backgroundColor: "inherit",
  },
  "& .MuiDataGrid-overlay": {
    zIndex: 1,
    position: "relative",
  },
  "& .MuiDataGrid-columnHeaders": {
    backgroundColor: "#3A6287",
    color: "white",
    fontsize: "12px",
    fontSize: "12px",
  },
  "& .MuiDataGrid-columnHeader": {
    textAlign: "center",
    padding: "0",
    justifyContent: "center",
    fontFamily: "SCDream",
  },
  "& .MuiButtonBase-root": {
    color: "black",
    fontFamily: "SCDream",
  },
  "& .MuiDataGrid-cell": {
    fontSize: "12px", //커스텀 폰트 사이즈
    padding: 0, // 빼면안됨 중앙정렬 안댐
    fontFamily: "SCDream",
  },
  "& .MuiDataGrid-cellCheckbox": {
    paddingLeft: "0px",
  },
  ".MuiTablePagination-actions svg ": {
    color: "black",
    width: "10px",
  },
  ".MuiDataGrid-columnHeaderTitleContainer": {
    width: "100%",
    flex: "none !important", // flex: 1을 제거해야 중앙정렬 가능
  },
  ".MuiDataGrid-cell--textLeft": {
    justifyContent: "center",
  },
  ".MuiDataGrid-main": {
    overflow: "visible !important",
  },
  ".MuiDataGrid-main > div:nth-child(3)": {
    display: "none !important",
  },
  ".MuiDataGrid-virtualScroller": {
    overflow: "visible !important",
    overflowY: "visible !important",
  },
}

export default colorSx
