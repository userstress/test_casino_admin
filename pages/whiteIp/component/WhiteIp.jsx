import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"

import styles from "./WhiteIp.module.css"

export default function WhiteIp() {
  const columns = [
    { field: "id", headerName: "No." },
    { field: "whiteIp", headerName: "화이트 아이피", flex: 1 },
    { field: "status", headerName: "상태", flex: 1 },
    {
      field: "memo",
      headerName: "메모",
      flex: 1,
      renderCell: (params) => {
        return (
          <select
            style={{
              backgroundColor: "#FFFFFF",
              color: "black",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
              width: "100%",
            }}
            defaultValue={"설정"}
          >
            <option value="ty">설정1</option>
            <option value="ty">설정2</option>
            <option value="ty">설정3</option>
          </select>
        )
      },
    },
    {
      field: "fix",
      headerName: "수정",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          console.log(`Cell clicked: ${params.value}`)
          return window.open("/getUserInfoes", "유저 정보", "width=1024, height=860")
        }

        return (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "#0000FF",
              color: "white",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
              width: "100%",
            }}
          >
            저장
          </button>
        )
      },
    },
    {
      field: "delete",
      headerName: "삭제",
      renderCell: (params) => {
        const handleClick = (event) => {
          event.preventDefault()
          // 여기에 클릭 이벤트에 대한 로직을 추가합니다.
          console.log(`Cell clicked: ${params.value}`)
          return window.FileReader.call()
        }

        return (
          <button
            onClick={handleClick}
            style={{
              backgroundColor: "red",
              width: "100%",
              color: "white",
              cursor: "pointer",
              height: "90%",
              lineHeight: "90%",
              border: "none",
              borderRadius: "4px",
            }}
          >
            삭제
          </button>
        )
      },
    },
  ]
  const rows = [
    {
      id: 1,
      number: "3",
      number: "2",
      name: "eoanf49",
      alramName: "아구찜집사장",
    },
  ]

  return (
    <>
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"화이트 아이피 설정"}
          customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5" }}
        />
        <div className={styles.addWrapper}>
          <section className={styles.addIpBox}>
            <div className={styles.divBox}>
              <div>아이피</div>
              <div>메모</div>
            </div>
            <div className={styles.inputBox}>
              <input type="text" />
              <input type="text" />
            </div>
          </section>
          <section className={styles.buttonBox}>
            <button type="button">아이피 추가</button>
          </section>
        </div>
        <div className={styles.tableContainer}>
          <CustomTable columns={columns} rows={rows} checkbox={false} />
        </div>
      </div>
    </>
  )
}
