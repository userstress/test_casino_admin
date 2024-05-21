import Layout from "@components/Layout"
import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import { useEffect, useState } from "react"
import styles from "./index.module.css"
import { getCookie } from "cookies-next"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { toast } from "react-toastify"

export default function index() {
  const mytoken = getCookie("token")
  const { sendRequest } = useAxiosRequest()

  const [lvrows, setRows] = useState([
    {
      lv: "1",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "2",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "3",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "4",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "5",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "6",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "7",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "8",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "9",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },
    {
      lv: "10",
      memberFall: "0",
      memberLossSingle: "0",
      recomSingleFall: "0",
      recomSingleFall2: "0",
      recon2: "0",
      recon3: "0",
      firstRecharge: "0",
      todayRecharge: "0",
    },

    // 나머지 행들도 이런 식으로 추가...
  ])

  // 입력 필드에서 발생하는 변경을 처리하는 함수
  const handleChange = (index, field, value) => {
    const newRows = [...lvrows]
    newRows[index][field] = value
    setRows(newRows)
  }

  function getlvPoint() {
    const method = "GET"
    const url = `/api/v2/managers/level-bonus-setting/all`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }

    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus) {
        // 에러 처리...
        if (errorStatus >= 500) {
          toast.warn("서버 에러입니다.")
        } else if (errorStatus === 400) {
          toast.warn("올바르지 않은 입력 값입니다.")
        } else if (errorStatus === 403 || errorStatus === 401) {
          toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
        } else if (errorStatus === 404) {
          toast.error("서버 응답이 없습니다.")
        }
      } else if (responseData && responseData.data) {
        // responseData.data를 사용하여 data 상태 업데이트

        setRows((currentData) => {
          // 현재 데이터 배열을 복사하여 새 배열을 생성
          const newData = [...currentData]
          // 받아온 데이터를 반복 처리
          responseData?.data?.forEach((updateInfo) => {
            // lv 값이 일치하는 객체를 찾음
            const itemIndex = newData.findIndex((item) => item.lv === updateInfo.lv.toString())
            if (itemIndex !== -1) {
              // 일치하는 객체의 firstRecharge와 todayRecharge를 업데이트
              newData[itemIndex] = {
                ...newData[itemIndex],
                firstRecharge: updateInfo.firstRecharge.toString(),
                todayRecharge: updateInfo.todayRecharge.toString(),
              }
            }
          })

          // 업데이트된 새 배열을 반환
          return newData
        })
      }
    })
  }
  function SettingLvPoint() {
    const method = "POST"
    const url = `/api/v2/managers/level-bonus-setting/update`
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    const body = lvrows.map((row) => ({
      id: parseInt(row.lv, 10), // lv 값을 정수로 변환하여 id로 사용
      lv: parseInt(row.lv, 10), // lv 값을 정수로 변환
      firstRecharge: parseInt(row.firstRecharge, 10), // 문자열을 정수로 변환
      todayRecharge: parseInt(row.todayRecharge, 10), // 문자열을 정수로 변환
    }))
    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus) {
        // 에러 처리...
        if (errorStatus >= 500) {
          toast.warn("서버 에러입니다.")
        } else if (errorStatus === 400) {
          toast.warn("올바르지 않은 입력 값입니다.")
        } else if (errorStatus === 403 || errorStatus === 401) {
          toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
        } else if (errorStatus === 404) {
          toast.error("서버 응답이 없습니다.")
        }
      } else if (responseData && responseData.data) {
        toast.success("변경하였습니다")
      }
    })
  }
  useEffect(() => {
    getlvPoint()
  }, [])

  useEffect(() => {}, [lvrows])
  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={" 레벨 설정"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />

      <table>
        <colgroup>
          <col width={80}></col>
          <col width={80}></col>
          <col width={170}></col>
          <col width={170}></col>
          <col width={170}></col>
        </colgroup>
        <thead>
          <tr>
            <th colSpan={2} style={{ backgroundColor: "#E5E5E5" }}>
              회원등급
            </th>
            <th colSpan={4} style={{ backgroundColor: "transparent", textAlign: "start" }}>
              <select>
                <option>일반</option>
              </select>
              <input type="checkbox"></input>전 등급 일괄 조정[적용]
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>회원등급</th>
            <th>회원레벨</th>
            <th>은행명</th>
            <th>계좌번호</th>
            <th>예금주</th>
            <th>고객센터번호</th>
          </tr>

          <tr>
            <td>일반</td>
            <td>1</td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"070-0000-0000"} style={{ width: "160px" }} />
            </td>
          </tr>
          <tr>
            <td>일반</td>
            <td>2</td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"070-0000-0000"} style={{ width: "160px" }} />
            </td>
          </tr>
          <tr>
            <td>일반</td>
            <td>3</td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"070-0000-0000"} style={{ width: "160px" }} />
            </td>
          </tr>
          <tr>
            <td>일반</td>
            <td>4</td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"고객센터문의"} style={{ width: "160px" }} />
            </td>
            <td>
              <input type="text" value={"070-0000-0000"} style={{ width: "160px" }} />
            </td>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>
              <button style={{ width: "100%" }}>수정</button>
            </td>
          </tr>
        </tfoot>
      </table>

      <table>
        <colgroup>
          <col width={66}></col>
          <col width={66}></col>
          <col width={97}></col>
          <col width={102}></col>
          <col width={97}></col>
          <col width={103}></col>
          <col width={97}></col>
          <col width={117}></col>
          <col width={96}></col>
        </colgroup>
        <thead>
          <tr>
            <th>회원등급</th>
            <th>회원레벨</th>
            <th>회원낙첨금(%)</th>
            <th>회원단폴-낙첨금(%)</th>
            <th>추천인단폴 낙첨금(%)</th>
            <th>추천인단폴 줄때-낙첨금(%)</th>
            <th>추천인받을때 낙첨금(%)</th>
            <th>추천인단폴 받을때-낙첨금(%)</th>
            <th>하루첫 충전시(%)</th>
            <th>매충전 포인트(%)</th>
          </tr>
        </thead>
        <tbody>
          {lvrows.map((row, index) => (
            <tr key={index}>
              <td>일반</td>
              <td>{row.lv}</td>
              <td>
                <input
                  type="text"
                  value={row.memberFall}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "memberFall", e.target.value)}
                />
                %
              </td>
              <td>
                <input
                  type="text"
                  value={row.memberLossSingle}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "memberLossSingle", e.target.value)}
                />
                %
              </td>
              {/* 나머지 입력 필드도 이런 식으로 처리 */}
              <td>
                <input
                  type="text"
                  value={row.recomSingleFall}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "recomSingleFall", e.target.value)}
                />
                %
              </td>
              <td>
                <input
                  type="text"
                  value={row.recomSingleFall2}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "recomSingleFall2", e.target.value)}
                />
                %
              </td>
              <td>
                <input
                  type="text"
                  value={row.recon2}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "recon2", e.target.value)}
                />
                %
              </td>
              <td>
                <input
                  type="text"
                  value={row.recon3}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "recon3", e.target.value)}
                />
                %
              </td>
              <td>
                <input
                  type="text"
                  value={row.firstRecharge}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "firstRecharge", e.target.value)}
                />
                %
              </td>
              <td>
                <input
                  type="text"
                  value={row.todayRecharge}
                  style={{ width: "78px" }}
                  onChange={(e) => handleChange(index, "todayRecharge", e.target.value)}
                />
                %
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={9}>
              <button style={{ width: "100%" }} onClick={() => SettingLvPoint()}>
                수정
              </button>
            </td>
          </tr>
        </tfoot>
      </table>

      <CustomHeader text={"스포츠"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <table style={{ width: "100%" }}>
        <colgroup>
          <col width={185}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
        </colgroup>
        <tbody>
          <tr>
            <th>회원등급</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
          </tr>
          <tr>
            <th>회원레벨</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
          </tr>

          <tr>
            <th>최소베팅액(승무패)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(승무패)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가(승무패)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(승무패-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(승무패-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (승무패-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(크로스)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(크로스)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가(크로스)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(크로스-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(크로스-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (크로스-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액 (핸디캡)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액 (핸디캡)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가(핸디캡)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(핸디캡-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(핸디캡-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가(핸디캡-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(스페셜)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가(스페셜)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(스페셜-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(스페셜-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (스페셜-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(스페셜2)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(스페셜2)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (스페셜2)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(스페셜2-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(스페셜2-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (스페셜2-단폴)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={11}>
              <button style={{ width: "100%" }}>수정</button>
            </td>
          </tr>
        </tfoot>
      </table>

      <CustomHeader text={"미니게임"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <table style={{ width: "100%" }}>
        <colgroup>
          <col width={185}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
          <col width={150}></col>
        </colgroup>
        <tbody>
          <tr>
            <th>회원등급</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
            <th>일반</th>
          </tr>

          <tr>
            <th>회원레벨</th>
            <th>1</th>
            <th>2</th>
            <th>3</th>
            <th>4</th>
            <th>5</th>
            <th>6</th>
            <th>7</th>
            <th>8</th>
            <th>9</th>
            <th>10</th>
          </tr>

          <tr>
            <th>최소베팅액(파워키노사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(파워키노사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (파워키노사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(파워볼)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(파워볼)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (파워볼)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(키노사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(키노사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (키노사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(파워볼사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(파워볼사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (파워볼사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(스피드키노)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(파워볼사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (파워볼사다리)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(스피드키노)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(스피드키노)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (스피드키노)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(달팽이)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(달팽이)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (달팽이)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(가상축구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(가상축구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (가상축구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(MGM바카라)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(MGM바카라)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (MGM바카라)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(애플홀짝)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(애플홀짝)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (애플홀짝)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(애플원카드)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(애플원카드)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (애플원카드)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(애플축구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(애플축구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (애플축구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(애플바카라)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(애플바카라)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (애플바카라)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(애플농구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(애플농구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (애플농구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(애플워게임)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(애플워게임)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (애플워게임)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최소베팅액(애플야구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>최대베팅액(애플야구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>

          <tr>
            <th>상한가 (애플야구)</th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
            <th>
              <input type="text" style={{ width: "140px" }}></input>
            </th>
          </tr>
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={11}>
              <button style={{ width: "100%" }}>수정</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  )
}

index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
