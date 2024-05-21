// 1.공지사항
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./GameManagementManualList.module.css"

export default function GameManagementManualList() {
  const columns = [
    { field: "id", headerName: "아이디", flex: 1, type: "number", headerAlign: "center", align: "center" },
    { field: "type", headerName: "종목", flex: 1, headerAlign: "center", align: "center" },
    { field: "country", headerName: "국가", flex: 1, headerAlign: "center", align: "center" },
    { field: "market", headerName: "마켓", flex: 1.3, headerAlign: "center", align: "center" },
    { field: "event", headerName: "이벤트", flex: 1.3, headerAlign: "center", align: "center" },
    { field: "league", headerName: "리그명", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "date", headerName: "경기시간", flex: 2, headerAlign: "center", align: "center" },
    { field: "home", headerName: "홈팀", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "home_bet", headerName: "홈배팅", flex: 1, headerAlign: "center", align: "center" },
    { field: "draw", headerName: "무배당", flex: 1, headerAlign: "center", align: "center" },
    { field: "range", headerName: "기준치", flex: 1, headerAlign: "center", align: "center" },
    { field: "away_bet", headerName: "원정배당", flex: 1, headerAlign: "center", align: "center" },
    { field: "away", headerName: "원정팀", flex: 2.1, headerAlign: "center", align: "center" },
    { field: "score", headerName: "스코어", flex: 1, headerAlign: "center", align: "center" },
    { field: "reset", headerName: "리셋", flex: 1, headerAlign: "center", align: "center" },
    { field: "auto", headerName: "오토", flex: 1, headerAlign: "center", align: "center" },
    { field: "state", headerName: "상태", flex: 1, headerAlign: "center", align: "center" },
  ]
  const rows = [
    {
      id: 1,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 2,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 3,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 4,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 5,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 6,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 7,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 8,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 9,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 10,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
    {
      id: 11,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home: "서울 이랜드 FC",
      home_bet: 2.12,
      draw: 0,
      range: 1.4,
      away_bet: 2.3,
      away: "광주 FC",
      score: "0:0",
      reset: null,
      auto: null,
      state: null,
    },
  ]
  return (
    <>
      <CustomHeader
        text={
          <div style={{ display: "flex", alignItems: "center" }}>
            게임관리&nbsp;
            <svg xmlns="http://www.w3.org/2000/svg" width="0.521vw" height="0.677vw" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>
            &nbsp;게임리스트&nbsp; <CustomButton text={"새로고침"} customStyle={{ background: "#D9D9D9" }} />
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />

      <CustomBar>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>금액</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>국가</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>종목</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>마켓</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>이벤트</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>리그</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>진행</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent
            customStyle={{ width: "100%", justifyContent: "space-around" }}
            textStyle={{ width: "5vw", textAlign: "right" }}
            text={"시작일자"}
          />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>오토</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer4}>
          <div style={{ width: "2.8vw", textAlign: "right" }}>검색</div>
          <CustomSelect optionArr={["선택"]} customStyle={{ width: "5vw" }} />
        </div>
        <div className={styles.boxContainer6}>
          <CustomInput customStyle={{ width: "65%", background: "#D9D9D9" }} />
          <CustomButton customStyle={{ width: "30%", background: "#D9D9D9" }} text={"검색"} />
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={columns} rows={rows} />
      </div>
    </>
  )
}
