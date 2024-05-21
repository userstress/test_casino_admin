import CustomButton from "@components/customButton/CustomButton"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomInput from "@components/customInput/CustomInput"
import CustomTable from "@components/customTable/CustomTable"
import CustomBar from "@components/custombar/CustomBar"
import CustomSelect from "@components/customselect/CustomSelect"
import DatePickerComponent from "@components/datepicker/DatePickerComponent"
import styles from "./SettingList.module.css"

export default function SettingList() {
  return (
    <div className={styles.boxContainer}>
      <CustomHeader text={"럭키 포인트 세팅"} customStyle={{ height: "1.979vw", width: "100%" }} />

      <div className={styles.tableListWrapper}>
        <div className={styles.tableWrapper}>
          <h3>* A타입 룰렛 설정</h3>
          <table>
            <colgroup>
              <col width={70}></col>
              <col></col>
              <col></col>
              <col></col>
              <col></col>
            </colgroup>
            <thead>
              <tr>
                <th>사용여부</th>
                <th>당첨률</th>
                <th>수량</th>
                <th>행운포인트</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.tableWrapper}>
          <h3>* B타입 룰렛 설정</h3>
          <table>
            <colgroup>
              <col width={70}></col>
              <col></col>
              <col></col>
              <col></col>
              <col></col>
            </colgroup>
            <thead>
              <tr>
                <th>사용여부</th>
                <th>당첨률</th>
                <th>수량</th>
                <th>행운포인트</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className={styles.tableWrapper}>
          <h3>* C타입 룰렛 설정</h3>
          <table>
            <colgroup>
              <col width={70}></col>
              <col></col>
              <col></col>
              <col></col>
              <col></col>
            </colgroup>
            <thead>
              <tr>
                <th>사용여부</th>
                <th>당첨률</th>
                <th>수량</th>
                <th>행운포인트</th>
                <th>수정</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
              <tr>
                <td>사용</td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <input type="text" style={{ width: "90px" }}></input>
                </td>
                <td>
                  <button>수정</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
