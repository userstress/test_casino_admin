import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./LevelSetting.module.css"
import { useState, useEffect } from "react"
import { TableHead } from "@mui/material"

export default function levelSetting() {
  const columns = [
    { field: "date", headerName: "날짜", maxWidth: 300, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "loginCount",
      headerName: "로그인 횟수",
      maxWidth: 280,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "chargeCount", headerName: "충전 횟수", maxWidth: 280, flex: 0.8, headerAlign: "center", align: "center" },
    {
      field: "exchangeCount",
      headerName: "환전 횟수",
      maxWidth: 280,
      flex: 0.8,
      headerAlign: "center",
      align: "center",
    },
    { field: "realBatter", headerName: "실베터", maxWidth: 280, flex: 0.8, headerAlign: "center", align: "center" },
    { field: "member", headerName: "가입자", maxWidth: 285, flex: 0.8, headerAlign: "center", align: "center" },
  ]

  const rows = [
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
    {
      id: 1,
      date: "2023-09-25",
      loginCount: "70",
      chargeCount: "110",
      exchangeCount: "21",
      realBatter: "52",
      member: "0",
    },
  ]
  const lvList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  const betSetting = [
    { text: "최소베팅액(승무패)", param: "gameMin" },
    { text: "최대베팅액(승무패)", param: "gameMax" },
    { text: "상한가(승무패)", param: "gameTop" },
    { text: "최소베팅액(승무패-단폴)", param: "pollmin" },
    { text: "최대베팅액(승무패-단폴)", param: "pollmax" },
    { text: "상한가 (승무패-단폴)", param: "pollTop" },
    { text: "최소베팅액(크로스)", param: "crossmin" },
    { text: "최대베팅액(크로스)", param: "crossmax" },
    { text: "상한가(크로스)", param: "crossTop" },
    { text: "최소베팅액(크로스-단폴)", param: "crossPollmin" },
    { text: "최대베팅액(크로스-단폴)", param: "crossPollmax" },
    { text: "상한가 (크로스-단폴)", param: "crossPollTop" },
    { text: "최소베팅액(핸디캡)", param: "handimin" },
    { text: "최대베팅액(핸디캡)", param: "handimax" },
    { text: "상한가(핸디캡)", param: "handiTop" },
    { text: "최소베팅액(핸디캡-단폴)", param: "handiPollmin" },
    { text: "최대베팅액(핸디캡-단폴)", param: "handiPollmax" },
    { text: "상한가 (핸디캡-단폴)", param: "handiPollTop" },
    { text: "최소베팅액(스페셜)", param: "specialmin" },
    { text: "최대베팅액(스페셜)", param: "specialmax" },
    { text: "상한가(스페셜)", param: "specialTop" },
    { text: "최소베팅액(스페셜-단폴)", param: "specialPollmin" },
    { text: "최대베팅액(스페셜-단폴)", param: "specialPollmax" },
    { text: "상한가 (스페셜-단폴)", param: "specialPollTop" },
    { text: "최소베팅액(스페셜2)", param: "special2min" },
    { text: "최대베팅액(스페셜2)", param: "special2max" },
    { text: "상한가(스페셜2)", param: "special2Top" },
    { text: "최소베팅액(스페셜2-단폴)", param: "special2Pollmin" },
    { text: "최대베팅액(스페셜2-단폴)", param: "specialPollmax" },
    { text: "상한가 (스페셜2-단폴)", param: "specialPollTop" },
  ]
  const miniSetting = [
    { text: "최소베팅액(파워키노사다리)", param: "powerKinomin" },
    { text: "최대베팅액(파워키노사다리)", param: "powerKinomax" },
    { text: "상한가(파워키노사다리)", param: "powerKinoTop" },
    { text: "최소베팅액(파워볼)", param: "ballmin" },
    { text: "최대베팅액(파워볼)", param: "ballmax" },
    { text: "상한가 (파워볼)", param: "ballTop" },
    { text: "최소베팅액(키노사다리)", param: "kinomin" },
    { text: "최대베팅액(키노사다리)", param: "kinomax" },
    { text: "상한가(키노사다리)", param: "kinoTop" },
    { text: "최소베팅액(파워볼사다리)", param: "powerballLaddermin" },
    { text: "최대베팅액(파워볼사다리)", param: "powerballLaddermax" },
    { text: "상한가 (파워볼사다리)", param: "powerballLadderTop" },
    { text: "최소베팅액(스피드키노)", param: "speedKinomin" },
    { text: "최대베팅액(스피드키노)", param: "speedKinomax" },
    { text: "상한가(스피드키노)", param: "speedKinoTop" },
    { text: "최소베팅액(달팽이)", param: "snailmin" },
    { text: "최대베팅액(달팽이)", param: "snailmax" },
    { text: "상한가 (달팽이)", param: "snailTop" },
    { text: "최소베팅액(가상축구)", param: "simulFootballmin" },
    { text: "최대베팅액(가상축구)", param: "simulFootballmax" },
    { text: "상한가(가상축구)", param: "simulFootballTop" },
    { text: "최소베팅액(MGM바카라)", param: "mgmBaccaratmin" },
    { text: "최대베팅액(MGM바카라)", param: "mgmBaccaratmax" },
    { text: "상한가 (MGM바카라)", param: "mgmBaccaratTop" },
    { text: "최소베팅액(MGM홀짝)", param: "mgmOddmin" },
    { text: "최대베팅액(MGM홀짝)", param: "mgmOddmax" },
    { text: "상한가(MGM홀짝)", param: "mgmOddTop" },
    { text: "최소베팅액(애플홀짝)", param: "appleOddmin" },
    { text: "최대베팅액(애플홀짝)", param: "appleOddmax" },
    { text: "상한가(애플홀짝)", param: "applleOddTop" },
    { text: "최소베팅액(애플원카드)", param: "appleOnecardmin" },
    { text: "최대베팅액(애플원카드)", param: "appleOnecardmax" },
    { text: "상한가(애플원카드)", param: "appleOnecardTop" },
    { text: "최소베팅액(애플축구)", param: "appleFootdmin" },
    { text: "최대베팅액(애플축구)", param: "appleFootdmax" },
    { text: "상한가(애플축구)", param: "appleFootTop" },
    { text: "최소베팅액(애플바카라)", param: "appleBaccarattdmin" },
    { text: "최대베팅액(애플바카라)", param: "appleBaccaratdmax" },
    { text: "상한가(애플바카라)", param: "appleBaccaratTop" },
    { text: "최소베팅액(애플농구)", param: "appleBasketmin" },
    { text: "최대베팅액(애플농구)", param: "appleBasketmax" },
    { text: "상한가(애플농구)", param: "appleBasketTop" },
    { text: "최소베팅액(애플워게임)", param: "appleWargamemin" },
    { text: "최대베팅액(애플워게임)", param: "appleWargamemax" },
    { text: "상한가(애플워게임)", param: "appleWargameTop" },
    { text: "최소베팅액(애플야구)", param: "applebasemin" },
    { text: "최대베팅액(애플야구)", param: "applebasemax" },
    { text: "상한가(애플야구)", param: "applebaseTop" },
  ]
  const [centerList, setCenter] = useState([])
  const [WinList, setWinList] = useState([])
  const [gameset, SetGameset] = useState([])
  const [miniGameset, SetminiGameset] = useState([])

  function handleCenter(event, level, parameter) {
    setCenter((prevCenterList) => {
      // 현재 상태의 복사본 생성
      const updatedCenterList = [...prevCenterList]

      // 해당 레벨을 찾아 업데이트
      const index = updatedCenterList.findIndex((center) => center.level === level)
      if (index !== -1) {
        updatedCenterList[index] = {
          ...updatedCenterList[index],
          [parameter]: event.target.value,
        }
      } else {
        // 해당 레벨이 없다면 새 항목 추가
        updatedCenterList.push({
          level,
          [parameter]: event.target.value,
        })
      }
      return updatedCenterList
    })
  }
  function handleWinRatio(event, level, parameter) {
    setWinList((prevCenterList) => {
      // 현재 상태의 복사본 생성
      const updatedCenterList = [...prevCenterList]

      // 해당 레벨을 찾아 업데이트
      const index = updatedCenterList.findIndex((center) => center.level === level)
      if (index !== -1) {
        updatedCenterList[index] = {
          ...updatedCenterList[index],
          [parameter]: event.target.value,
        }
      } else {
        // 해당 레벨이 없다면 새 항목 추가
        updatedCenterList.push({
          level,
          [parameter]: event.target.value,
        })
      }
      console.log(updatedCenterList)
      return updatedCenterList
    })
  }
  function handlegameSet(event, level, parameter) {
    SetGameset((prevCenterList) => {
      // 현재 상태의 복사본 생성
      const updatedCenterList = [...prevCenterList]

      // 해당 레벨을 찾아 업데이트
      const index = updatedCenterList.findIndex((center) => center.level === level)
      if (index !== -1) {
        updatedCenterList[index] = {
          ...updatedCenterList[index],
          [parameter]: event.target.value,
        }
      } else {
        // 해당 레벨이 없다면 새 항목 추가
        updatedCenterList.push({
          level,
          [parameter]: event.target.value,
        })
      }
      console.log(updatedCenterList)
      return updatedCenterList
    })
  }
  function handleMinigameSet(event, level, parameter) {
    SetminiGameset((prevCenterList) => {
      // 현재 상태의 복사본 생성
      const updatedCenterList = [...prevCenterList]

      // 해당 레벨을 찾아 업데이트
      const index = updatedCenterList.findIndex((center) => center.level === level)
      if (index !== -1) {
        updatedCenterList[index] = {
          ...updatedCenterList[index],
          [parameter]: event.target.value,
        }
      } else {
        // 해당 레벨이 없다면 새 항목 추가
        updatedCenterList.push({
          level,
          [parameter]: event.target.value,
        })
      }
      console.log(updatedCenterList)
      return updatedCenterList
    })
  }
  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"회원별 레벨 설정"} customStyle={{ height: "1.979vw", width: "100%" }} />
      <div className={styles.tableContainer}>
        <section className={styles.tablesection}>
          <table id="centers" className={styles.centerTable}>
            <thead>
              <tr>
                <th scope="col">회원레벨</th>
                <th scope="col">은행명</th>
                <th scope="col">계좌번호</th>
                <th scope="col">예금주</th>
                <th scope="col">고객센터번호</th>
              </tr>
            </thead>
            <tbody>
              {lvList.map((level) => {
                return (
                  <tr id={level}>
                    <td id={`cell${level}-0`}>{level}</td>
                    <td id={`cell${level}-0`}>
                      <input
                        type="text"
                        className={styles.BankName}
                        onChange={(event) => handleCenter(event, level, "bankName")}
                      />
                    </td>
                    <td id={`cell${level}-0`}>
                      <input
                        type="text"
                        className={styles.accountNumber}
                        onChange={(event) => handleCenter(event, level, "accountNumber")}
                      />
                    </td>
                    <td id={`cell${level}-0`}>
                      <input
                        type="text"
                        className={styles.accountName}
                        onChange={(event) => handleCenter(event, level, "accountName")}
                      />
                    </td>
                    <td id={`cell${level}-0`}>
                      <input
                        type="text"
                        className={styles.centerPhone}
                        onChange={(event) => handleCenter(event, level, "centerPhone")}
                      />
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button type="button" className={styles.centerBtn}>
            수정
          </button>
        </section>

        <section className={styles.tablesection2}>
          <table id="centers" className={styles.centerTable2}>
            <thead>
              <tr>
                <th scope="col">
                  <div className={styles.ratioLevels}>회원레벨</div>
                </th>
                <th scope="col" className={styles.TableTtag2}>
                  <div className={styles.winRatio}>
                    <span>회원</span>
                    <span>낙첨금(%)</span>
                  </div>
                </th>
                <th scope="col" className={styles.TableTtag2}>
                  <div className={`${styles.winRatio} , ${styles.singlePollWin}`}>
                    <span>회원</span>
                    <span>단폴-낙첨금(%)</span>
                  </div>
                </th>
                <th scope="col" className={styles.TableTtag2}>
                  <div className={styles.winRatio}>
                    <span>추천인단폴</span>
                    <span>낙천금(%)</span>
                  </div>
                </th>
                <th scope="col" className={styles.TableTtag2}>
                  <div className={styles.winRatio}>
                    <span>추천인단폴</span>
                    <span>줄때-낙천금(%)</span>
                  </div>
                </th>
                <th scope="col" className={styles.TableTtag2}>
                  <div className={styles.winRatio}>
                    <span>추천인받을때</span>
                    <span>낙천금(%)</span>
                  </div>
                </th>
                <th scope="col" className={styles.TableTtag2}>
                  <div className={styles.winRatio}>
                    <span>추천인단폴</span>
                    <span>받을때-낙천금(%)</span>
                  </div>
                </th>
                <th scope="col" className={styles.TableTtag2}>
                  <div className={styles.winRatio}>
                    <span>하루첫</span>
                    <span>충전시(%)</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {lvList.map((level) => {
                return (
                  <tr id={level}>
                    <td id={`cell${level}-0`}>{level}</td>
                    <td id={`cell${level}-0`}>
                      <div>
                        <input
                          type="text"
                          className={styles.first}
                          onChange={(event) => handleWinRatio(event, level, "windRatio")}
                        />
                        &nbsp; %
                      </div>
                    </td>
                    <td id={`cell${level}-0`}>
                      <div>
                        <input
                          type="text"
                          className={styles.first}
                          onChange={(event) => handleWinRatio(event, level, "windRatioPoll")}
                        />
                        &nbsp; %
                      </div>
                    </td>
                    <td id={`cell${level}-0`}>
                      <div>
                        <input
                          type="text"
                          className={styles.first}
                          onChange={(event) => handleWinRatio(event, level, "recommandWinPoll")}
                        />
                        &nbsp;%
                      </div>
                    </td>
                    <td id={`cell${level}-0`}>
                      <div>
                        <input
                          type="text"
                          className={styles.first}
                          onChange={(event) => handleWinRatio(event, level, "recommandWinPollGive")}
                        />
                        &nbsp;%
                      </div>
                    </td>
                    <td id={`cell${level}-0`}>
                      {" "}
                      <div>
                        <input
                          type="text"
                          className={styles.first}
                          onChange={(event) => handleWinRatio(event, level, "recommandWinPollTake")}
                        />
                        &nbsp;%
                      </div>
                    </td>
                    <td id={`cell${level}-0`}>
                      <div>
                        <input
                          type="text"
                          className={styles.first}
                          onChange={(event) => handleWinRatio(event, level, "recommandWinPollTake")}
                        />
                        &nbsp; %
                      </div>
                    </td>
                    <td id={`cell${level}-0`}>
                      {" "}
                      <div>
                        <input
                          type="text"
                          className={styles.first}
                          onChange={(event) => handleWinRatio(event, level, "dailyCharge")}
                        />
                        &nbsp; %
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
          <button type="button" className={styles.centerBtn}>
            수정
          </button>
        </section>

        <CustomHeader text={"스포츠"} customStyle={{ height: "1.979vw", width: "100%", marginTop: "10px" }} />

        <section className={styles.tablesection3}>
          <table id="centers" className={styles.centerTable3}>
            <thead>
              <tr>
                <th scope="col">
                  <div className={styles.ratioLevels2}>회원레벨</div>
                </th>
                {lvList.map((level) => {
                  return (
                    <th scope="col" key={level} className={styles.tablecell3}>
                      <span className={styles.tablecell3}>{level}</span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {betSetting.map((setting) => (
                <tr key={setting.param}>
                  <td className={styles.ratioLevels2}>{setting.text}</td>
                  {lvList.map((level) => {
                    return (
                      <td key={level}>
                        <input
                          type="text"
                          className={styles.tablecell3}
                          onChange={(event) => handlegameSet(event, level, setting.param)}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className={styles.centerBtn}>
            수정
          </button>
        </section>

        <CustomHeader text={"미니게임"} customStyle={{ height: "1.979vw", width: "100%", marginTop: "10px" }} />

        <section className={styles.tablesection3}>
          <table id="centers" className={styles.centerTable3}>
            <thead>
              <tr>
                <th scope="col">
                  <div className={styles.ratioLevels2}>회원레벨</div>
                </th>
                {lvList.map((level) => {
                  return (
                    <th scope="col" key={level} className={styles.tablecell3}>
                      <span className={styles.tablecell3}>{level}</span>
                    </th>
                  )
                })}
              </tr>
            </thead>
            <tbody>
              {miniSetting.map((setting) => (
                <tr key={setting.param}>
                  <td className={styles.ratioLevels2}>{setting.text}</td>
                  {lvList.map((level) => {
                    return (
                      <td key={level}>
                        <input
                          type="text"
                          className={styles.tablecell3}
                          onChange={(event) => handleMinigameSet(event, level, setting.param)}
                        />
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" className={styles.centerBtn}>
            수정
          </button>
        </section>
      </div>
    </div>
  )
}
