import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./SportsGameMGList.module.css"

export default function SportsGameMGList() {
  const columns = [
    { field: "id", headerName: "아이디", flex: 1, type: "number" ,headerAlign:'center',align:'center'},
    { field: "type", headerName: "종목",flex:1 ,headerAlign:'center',align:'center'},
    { field: "country", headerName: "국가",flex:1 ,headerAlign:'center',align:'center'},
    { field: "market", headerName: "마켓",flex:1.3 ,headerAlign:'center',align:'center'},
    { field: "event", headerName: "이벤트",flex:1.3 ,headerAlign:'center',align:'center'},
    { field: "league", headerName: "리그명",flex:2.1 ,headerAlign:'center',align:'center'},
    { field: "date", headerName: "경기시간",flex:2 ,headerAlign:'center',align:'center'},
    { field: "home", headerName: "홈팀",flex:2.1 ,headerAlign:'center',align:'center'},
    { field: "home_bet", headerName: "홈배팅",flex:1 ,headerAlign:'center',align:'center'},
    { field: "draw", headerName: "무배당",flex:1 ,headerAlign:'center',align:'center'},
    { field: "range", headerName: "기준치",flex:1 ,headerAlign:'center',align:'center'},
    { field: "away_bet", headerName: "원정배당",flex:1 ,headerAlign:'center',align:'center'},
    { field: "away", headerName: "원정팀",flex:2.1 ,headerAlign:'center',align:'center'},
    { field: "score", headerName: "스코어",flex:1 ,headerAlign:'center',align:'center'},
    { field: "reset", headerName: "리셋",flex:1 ,headerAlign:'center',align:'center'},
    { field: "auto", headerName: "오토",flex:1 ,headerAlign:'center',align:'center'},
    { field: "state", headerName: "상태",flex:1 ,headerAlign:'center',align:'center'},
  ]
  const filteredColumns = columns.filter((column) => column.field !== "id")
  const rows = [
    {
      id: 1,
      type: "축구",
      country: "대한민국",
      market: "스코어오버언더",
      event: "후반(정규)",
      league: "K-League2",
      date: "2023-10-02   17:00",
      home:'서울 이랜드 FC',
      home_bet:2.12,
      draw:0,
      range:1.4,
      away_bet:2.3,
      away:'광주 FC',
      score:'0:0',
      reset:null,
      auto:null,
      state:null,
    },
    {
        id: 2,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 3,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 4,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 5,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 6,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 7,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 8,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 9,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 10,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
      {
        id: 11,
        type: "축구",
        country: "대한민국",
        market: "스코어오버언더",
        event: "후반(정규)",
        league: "K-League2",
        date: "2023-10-02   17:00",
        home:'서울 이랜드 FC',
        home_bet:2.12,
        draw:0,
        range:1.4,
        away_bet:2.3,
        away:'광주 FC',
        score:'0:0',
        reset:null,
        auto:null,
        state:null,
      },
  ]
  return (
    <>
      <CustomHeader text={"회원관리 - [총 인원 : 365명]"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <CustomBar>
        <div className={styles.boxContainer1}>
          <div>금액</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div>국가</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div>종목</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div>마켓</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div style={{width:'2.604vw'}}>이벤트</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div>리그</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div>진행</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer2}>
          <DatePickerComponent text={'시작일시'} customStyle={{width:'8.333vw'}} textStyle={{width:'3.8vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div>오토</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer1}>
          <div>검색</div>
          <CustomSelect optionArr={['전체']} customStyle={{width:'4.479vw'}}/>
        </div>
        <div className={styles.boxContainer3}>
          <CustomInput customStyle={{width:'50%',backgroundColor:'#D9D9D9'}}/>
          <CustomButton text={'검색'} customStyle={{width:'18%',backgroundColor:'#D9D9D9'}}/>
          <CustomButton text={'엑셀저장'} customStyle={{width:'30%',backgroundColor:'#D9D9D9'}}/>
        </div>
      </CustomBar>
      <div className={styles.tableContainer}>
        <CustomTable columns={filteredColumns} rows={rows} checkbox={false} />
      </div>
      
    </>
  )
}
