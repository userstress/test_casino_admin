import Layout from "@components/Layout"
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
      <CustomHeader text={"암호변경"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>기존암호</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
          <tr>
            <td>변경 암호 입력</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
          <tr>
            <td>변경 암호 확인</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader
        text={"회원정보 변경 암호 설정"}
        customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>기존암호</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
          <tr>
            <td>변경 암호 입력</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
          <tr>
            <td>변경 암호 확인</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader
        text={"회원 엑셀 암호 설정"}
        customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>기존암호</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
          <tr>
            <td>변경 암호 입력</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
          <tr>
            <td>변경 암호 확인</td>
            <td>
              <input type="text" style={{ width: "250px" }}></input>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader text={"비공개 설정"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>사이트 비공개 설정</td>
            <td>
              <select>
                <option>추천인가입</option>
              </select>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader
        text={"모바일앱 도메인 설정"}
        customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>앱도메인 설정</td>
            <td>
              <select>
                <option>m.nxz578.com</option>
              </select>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader
        text={"핸드폰 인증 사용"}
        customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>핸드폰 인증 사용</td>
            <td>
              <select>
                <option>인증사용</option>
              </select>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>폰인증 테스트 번호 등록</td>
            <td>
              <input type="text" style={{ width: "100px" }}></input>-
              <input type="text" style={{ width: "100px" }}></input>-
              <input type="text" style={{ width: "100px" }}></input>
              <button>인증</button>
            </td>
          </tr>
        </table>
      </div>
      <CustomHeader
        text={"계좌정보 노출 설정"}
        customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>계좌정보 노출 설정</td>
            <td>
              <select>
                <option>노출</option>
              </select>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader text={"게시판 관리"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>일일 게시판 글 등록 횟수</td>
            <td>
              <input type="text" style={{ width: "250px" }} value={6}></input>
            </td>
          </tr>
          <tr>
            <td>시간당 댓글 등록 횟수</td>
            <td>
              <input type="text" style={{ width: "250px" }} value={3}></input>
            </td>
          </tr>
          <tr>
            <td>게시판 글 등록시</td>
            <td>
              <input type="text" style={{ width: "250px" }} value={50}></input>
            </td>
          </tr>
          <tr>
            <td>댓글 등록시</td>
            <td>
              <input type="text" style={{ width: "250px" }} value={3}></input>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader
        text={"라이브 스코어 연동"}
        customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>라이브 스코어 연동</td>
            <td>
              <select>
                <option>연동안함</option>
              </select>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader
        text={"신규 가입 회원 포인트 (머니) 지급 설정"}
        customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }}
      />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>지급방식 포인트 (머니) 설정</td>
            <td>
              <select>
                <option>포인트지급</option>
              </select>
              <input type="text" style={{ width: "160px", margin: "0px 5px" }} value={5000}></input>포인트(원)
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader text={"베팅금액 체크"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>설정 금액</td>
            <td>
              <input type="text" style={{ width: "250px" }} value={1500000}></input>
            </td>
          </tr>
          <tr>
            <td>설정 배당률</td>
            <td>
              <input type="text" style={{ width: "250px" }} value={1000}></input>
            </td>
          </tr>
          <tr>
            <td>설정 폴더수</td>
            <td>
              <input type="text" style={{ width: "250px" }} value={15}></input>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader text={"카지노 점검"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>올벳</td>
            <td>
              <label>OFF</label>
              <input type="radio" style={{ width: "" }}></input>
              <label>ON</label>
              <input type="radio" style={{ width: "" }}></input>
            </td>
          </tr>
          <tr>
            <td>마이크로</td>
            <td>
              <label>OFF</label>
              <input type="radio" style={{ width: "" }}></input>
              <label>ON</label>
              <input type="radio" style={{ width: "" }}></input>
            </td>
          </tr>
          <tr>
            <td>슬롯</td>
            <td>
              <label>OFF</label>
              <input type="radio" style={{ width: "" }}></input>
              <label>ON</label>
              <input type="radio" style={{ width: "" }}></input>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
      <CustomHeader text={"간편 계좌 설정"} customStyle={{ height: "1.979vw", width: "100%", marginBottom: "10px" }} />
      <div
        style={{
          width: "850px",
          display: "flex",
          alignItems: "flex-end",
          flexDirection: "column",
          marginBottom: "10px",
        }}
      >
        <table>
          <colgroup>
            <col width={200}></col>
            <col></col>
          </colgroup>
          <tr>
            <td>사용유무</td>
            <td>
              <label>OFF</label>
              <input type="radio" style={{ width: "" }}></input>
              <label>ON</label>
              <input type="radio" style={{ width: "" }}></input>
            </td>
          </tr>
        </table>
        <CustomButton
          customStyle={{ width: "100px", height: "30px", backgroundColor: "#696969", color: "white" }}
          fontStyle={{ fontSize: "0.6vw" }}
          text={"수정"}
        />
      </div>
    </div>
  )
}
