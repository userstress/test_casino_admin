import React, { useReducer, useState } from "react"
import styles from "./CustomSiginIn.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomButton from "@components/customButton/CustomButton"
import { toast } from "react-toastify"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useAuthStore } from "@utils/useAuthStore"
import axios from "axios"
import baseUrl from "@utils/REST/baseUrl"

export default function CustomSignIn() {
  const initialState = {
    userid: "",
    nickname: "",
    password: "",
    confirmPassword: "",
    birth: "",
    birthSecond: "",
    phoneNumberFirst: "010",
    phoneNumberSecond: "",
    phoneNumberThird: "",
    bankAccount: "",
    bankName: "",
    ownerName: "",
    userMail: "",
    userMailSecond: "naver.com",
    bankPW: "",
    bankuserName: "",
    referredBy: "",
    store: "",
  }
  // 초기 상태 정의

  const actionTypes = {
    setUserid: "SET_USERID",
    setNickname: "SET_NICKNAME",
    setPassword: "SET_PASSWORD",
    setConfirmPassword: "SET_CONFIRM_PASSWORD",
    setBirth: "SET_BIRTH",
    setBirthSecond: "SET_BIRTH_SECOND",
    setphoneNumberFirst: "SET_NUMBER_FIRST",
    setphoneNumberSecond: "SET_NUMBER_SECOND",
    setphoneNumberThird: "SET_NUMBER_THIRD",
    setBankAccount: "SET_BANK_ACCOUNT",
    setBankName: "SET_BANK_NAME",
    setownerName: "SET_BANK_OWNERNAME",
    setMail: "SET_EMAIL",
    setMailSecond: "SET_EMAIL_SECOND",
    setBankPW: "SET_BANK_PW",
    setBankUserName: "SET_BANK_USERNAME",
    setRefferer: "SET_REFFERER",
    setstore: "SET_STORE",
    RESET: "RESET",
  }
  const useridRegex = /^[a-zA-Z0-9]{0,12}$/ // 4~12자의 알파벳 또는 숫자
  const nicknameRegex = /^[가-힣ㄱ-ㅎㅏ-ㅣa-zA-Z0-9]{2,7}$/ // 2~10자의 한글, 알파벳 또는 숫자
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*\\+=]{4,14}$/
  const phoneRegex = /^[0-9]{1,4}$/
  const AccountNumber = /^[0-9]{5,14}$/
  const mailFirst = /^[a-zA-Z0-9+-_.]/
  const svgs = new Array(6).fill(null)

  // 리듀서 함수 정의
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.setUserid: {
        const value = action.payload
        return { ...state, userid: value }
      }
      case actionTypes.setNickname: {
        const value = action.payload
        return { ...state, nickname: value }
      }
      case actionTypes.setPassword: {
        const value = action.payload
        return { ...state, password: value }
      }
      case actionTypes.setConfirmPassword: {
        const value = action.payload

        return { ...state, confirmPassword: value }
      }
      case actionTypes.setBirth: {
        const value = action.payload

        return { ...state, birth: value }
      }
      case actionTypes.setBirthSecond: {
        const value = action.payload
        return { ...state, birthSecond: value }
      }
      case actionTypes.setphoneNumberFirst: {
        const value = action.payload
        return { ...state, phoneNumberFirst: value }
      }
      case actionTypes.setphoneNumberSecond: {
        const value = action.payload
        return { ...state, phoneNumberSecond: value }
      }
      case actionTypes.setBankUserName: {
        const value = action.payload
        return { ...state, bankuserName: value }
      }
      case actionTypes.setphoneNumberThird: {
        const value = action.payload
        return { ...state, phoneNumberThird: value }
      }
      case actionTypes.setBankAccount: {
        const value = action.payload
        return { ...state, bankAccount: value }
      }
      case actionTypes.setownerName: {
        const value = action.payload
        return { ...state, ownerName: value }
      }
      case actionTypes.setBankName: {
        const value = action.payload
        return { ...state, bankName: value }
      }
      case actionTypes.setMail: {
        const value = action.payload
        return { ...state, userMail: value }
      }
      case actionTypes.setMailSecond: {
        const value = action.payload
        return { ...state, userMailSecond: value }
      }
      case actionTypes.setstore: {
        const value = action.payload
        return { ...state, store: value }
      }
      case actionTypes.setBankPW: {
        const value = action.payload
        return { ...state, bankPW: value }
      }
      case actionTypes.setRefferer: {
        const value = action.payload
        return { ...state, referredBy: value }
      }
      case "RESET":
        return initialState

      default:
        return state
    }
  }
  const [signUpState, dispatch] = useReducer(reducer, initialState)

  const handleChange = (event, actionType) => {
    dispatch({
      type: actionType,
      payload: event.target.value,
    })
  }

  const sendSignUp = async (event) => {
    event.preventDefault()
    if (!useridRegex.test(signUpState.userid.trim())) {
      return toast.error("아이디를 옳바르게 입력해 주세요", {})
    }
    if (!nicknameRegex.test(signUpState.nickname.trim())) {
      return toast.error("닉네임을 옳바르게 입력해 주세요", {})
    }
    if (!passwordRegex.test(signUpState.password.trim())) {
      return toast.error("비밀번호를 옳바르게 입력해 주세요", {})
    }

    if (!phoneRegex.test(Number(signUpState.phoneNumberFirst.trim()))) {
      return toast.error("옳바른 뒷자리 첫번째 번호를 입력해 주세요.", {})
    }
    if (!phoneRegex.test(Number(signUpState.phoneNumberSecond.trim()))) {
      return toast.error("옳바른 휴대전화 번호 중간 4자리 입력해 주세요.", {})
    }
    if (!phoneRegex.test(Number(signUpState.phoneNumberThird.trim()))) {
      return toast.error("옳바른 휴대전화 번호 끝 4자리 입력해 주세요.", {})
    }

    if (!AccountNumber.test(signUpState.bankAccount.trim())) {
      return toast.error("계좌번호는 숫자만 입력 해 주세요.", {})
    }
    if (!mailFirst.test(signUpState.userMail.trim())) {
      return toast.error("옳바른 이메일 형식이 아닙니다.", {})
    }
    if (signUpState.bankAccount.length < 7) {
      return toast.error("계좌번호가 너무 짧습니다")
    }
    if (signUpState.bankPW.length > 8) {
      return toast.error("환전 비밀번호는 8자리 이내로 입력해 주세요")
    }
    if (!signUpState.referredBy.trim()) {
      return toast.error("추천인을 입력해 주세요", {})
    }

    event.preventDefault()

    const url = `${baseUrl}api/v2/register/user`

    const headers = { "Content-Type": "application/json" }
    const body = JSON.stringify({
      username: signUpState.userid,
      nickname: signUpState.nickname,
      password: signUpState.password,
      phone: `${signUpState.phoneNumberFirst}-${signUpState.phoneNumberSecond}-${signUpState.phoneNumberThird}`,
      number: signUpState.bankAccount,
      referredBy: signUpState.referredBy,
      store: signUpState.store || "",
      bankName: signUpState.bankName,
      bankPassword: signUpState.bankPW,
      email: `${signUpState.userMail}@${signUpState.userMailSecond}`,
      ownerName: signUpState.ownerName,
      name: signUpState.ownerName,
      birth: signUpState.birth,
    })

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: body,
      })

      const contentType = response.headers.get("Content-Type")

      if (response.ok) {
        toast.success("회원가입 신청이 완료되었습니다.")
        dispatch({
          type: "RESET",
        })
      } else {
        let errorMessage = "알 수 없는 오류가 발생했습니다."
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json()
          if (errorData.fieldErrorList && errorData.fieldErrorList.length > 0) {
            errorMessage = errorData.fieldErrorList[0].reason || "잘못된 양식입니다"
          } else if (errorData.message) {
            errorMessage = errorData.message
          }
        } else {
          errorMessage = await response.text()
        }

        switch (response.status) {
          case 400:
            toast.error(errorMessage)
            break
          case 401:
          case 403:
            toast.warn(errorMessage)
            break
          case 404:
            toast.error(errorMessage || "서버를 찾을 수 없습니다")
            break
          case 500:
            toast.warn(errorMessage || "서버 내부 오류입니다.")
            break
          default:
            toast.error(errorMessage)
            break
        }
      }
    } catch (error) {
      toast.error(`네트워크 오류가 발생했습니다: ${error.message}`)
      console.log(error)
    }

    return false
  }
  const checkUserName = async (username) => {
    if (!useridRegex.test(signUpState.userid.trim()) || !signUpState.userid) {
      return toast.error("아이디를 올바르게 입력해 주세요", {})
    }
    try {
      const response = await axios.get(`https://dailymodelapp.com/api/v2/username?username=${username}`, {})
      const result = await response.status
      if (result === 200 || result === 201) {
        toast.success("사용 가능한 아이디 입니다.")
      } else {
        return toast.error("사용 불가능한 아이디입니다", {})
      }
      return true
    } catch (errorData) {
      return toast.error("사용 불가능한 아이디입니다", {})

      return false
    }
  }

  const handleReset = () => {
    dispatch({ type: "RESET" })
  }

  return (
    <form className={styles.boxContainer} onSubmit={sendSignUp}>
      <div className={styles.boxInner}>
        <CustomHeader
          text={"회원등록"}
          customStyle={{ background: "#3A6287", height: "1.979vw", fontSize: "1.042vw" }}
        />
        <div className={styles.sectionContainer}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>회원 아이디</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="text"
                  id="id"
                  onChange={(event) => handleChange(event, "SET_USERID")}
                  maxLength={12}
                  value={signUpState.userid}
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%" }}
                />

                <input
                  type="button"
                  value="중복확인"
                  onClick={() => checkUserName(signUpState.userid)}
                  style={{ width: "11%", background: "#0B73D2", color: "white", marginLeft: "10px", border: "none" }}
                />

                <div style={{ fontSize: "12px", marginLeft: "10px" }}>영문, 숫자 4~12자 (특수 문자 불가)</div>
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>비밀번호</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="password"
                  id="password"
                  onChange={(event) => handleChange(event, "SET_PASSWORD")}
                  maxLength={14}
                  className={styles.inputPassword}
                  value={signUpState.password}
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>생년월일</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner2}>
                <input
                  type="text"
                  id="birthday"
                  style={{ width: "132px" }}
                  onChange={(event) => handleChange(event, "SET_BIRTH")}
                  value={signUpState.birth}
                  maxLength={6}
                />
                <span
                  style={{
                    textAlign: "center",
                    lineHeight: "35px",
                  }}
                >
                  -
                </span>
                <input
                  type="text"
                  id="birthday2"
                  style={{ width: "32px" }}
                  value={signUpState.birthSecond}
                  onChange={(event) => handleChange(event, "SET_BIRTH_SECOND")}
                  maxLength={1}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <div className={styles.circleContainer}>
                    {svgs.map((_, index) => (
                      <svg
                        key={index} // Always use a unique key when rendering a list
                        xmlns="http://www.w3.org/2000/svg"
                        width="14px"
                        height="14px"
                        viewBox="0 0 28 28"
                        fill="none"
                        opacity="0.6"
                        color="black"
                      >
                        <circle cx="14" cy="14" r="14" fill="black" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p>*예시)800101-1</p>
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>닉네임</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="text"
                  id="nickname"
                  onChange={(event) => handleChange(event, "SET_NICKNAME")}
                  maxLength={7}
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%" }}
                  value={signUpState.nickname}
                />
                <p style={{ fontSize: "12px", marginLeft: "10px" }}>
                  *닉네임은 한글 또는 영문 포함 7자리까지 가능합니다.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>휴대폰 번호</div>
            <div className={styles.sectionContent2}>
              <div className={styles.phoneNumberContainer}>
                <input
                  name="phoneNumberFirst"
                  id="phoneNumberFirst"
                  onChange={(event) => handleChange(event, "SET_NUMBER_FIRST")}
                  defaultValue="010"
                  style={{ border: "1px solid #181D4B", width: "30%", height: "100%" }}
                  className={styles.InputPh}
                  value={signUpState.phoneNumberFirst}
                  readOnly
                />
                -
                <input
                  type="text"
                  id="phoneNumberSecond"
                  className={styles.InputPh}
                  onChange={(event) => handleChange(event, "SET_NUMBER_SECOND")}
                  maxLength={4}
                  style={{ border: "1px solid #181D4B", width: "30%", height: "100%" }}
                  value={signUpState.phoneNumberSecond}
                />
                -
                <input
                  type="text"
                  id="phoneNumberThird"
                  className={styles.InputPh}
                  onChange={(event) => handleChange(event, "SET_NUMBER_THIRD")}
                  maxLength={4}
                  style={{ border: "1px solid #181D4B", width: "30%", height: "100%" }}
                  value={signUpState.phoneNumberThird}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>이메일</div>
            <div className={styles.sectionContent2}>
              <div className={styles.emailContainer}>
                <input
                  style={{ border: "1px solid #181D4B", width: "44.4%", height: "100%" }}
                  type="text"
                  id="email"
                  onChange={(event) => handleChange(event, "SET_EMAIL")}
                  value={signUpState.userMail}
                />
                @
                <select
                  name="phoneNumberFirst"
                  id="phoneNumberFirst"
                  onChange={(event) => handleChange(event, "SET_EMAIL_SECOND")}
                  defaultValue="naver.com"
                  style={{ border: "1px solid #181D4B", background: "white", width: "18.6%" }}
                  className={styles.boxWrapper}
                  value={signUpState.userMailSecond}
                >
                  <option value="naver.com" style={{ color: "black" }}>
                    naver.com
                  </option>
                  <option value="daum.net" style={{ color: "black" }}>
                    daum.net
                  </option>
                  <option value="gmail.com" style={{ color: "black" }}>
                    gmail.com
                  </option>
                </select>
                <input
                  style={{ border: "1px solid #181D4B", width: "32.6%", height: "100%" }}
                  type="text"
                  id="email"
                  onChange={(event) => handleChange(event, "SET_EMAIL_SECOND")}
                  defaultValue=""
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>은행명</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <select
                  name=""
                  id=""
                  value={signUpState.bankName}
                  onChange={(event) => handleChange(event, "SET_BANK_NAME")}
                >
                  <option className={styles.whiteOption} value="" defaultValue="kb">
                    은행명 선택
                  </option>
                  <option className={styles.whiteOption} value="농협">
                    농협
                  </option>
                  <option className={styles.whiteOption} value="국민은행">
                    국민은행
                  </option>
                  <option className={styles.whiteOption} value="우리은행">
                    우리은행
                  </option>
                  <option className={styles.whiteOption} value="신한은행">
                    신한은행
                  </option>
                  <option className={styles.whiteOption} value="하나은행">
                    하나은행
                  </option>
                  <option className={styles.whiteOption} value="SC제일은행">
                    SC제일은행
                  </option>
                  <option className={styles.whiteOption} value="대구은행">
                    대구은행
                  </option>
                  <option className={styles.whiteOption} value="부산은행">
                    부산은행
                  </option>
                  <option className={styles.whiteOption} value="광주은행">
                    광주은행
                  </option>
                  <option className={styles.whiteOption} value="제주은행">
                    제주은행
                  </option>
                  <option className={styles.whiteOption} value="전북은행">
                    전북은행
                  </option>
                  <option className={styles.whiteOption} value="경남은행">
                    경남은행
                  </option>
                  <option className={styles.whiteOption} value="우체국">
                    우체국
                  </option>
                  <option className={styles.whiteOption} value="수협">
                    수협
                  </option>
                  <option className={styles.whiteOption} value="새마을금고">
                    새마을금고
                  </option>
                  <option className={styles.whiteOption} value="카카오뱅크">
                    카카오뱅크
                  </option>
                  <option className={styles.whiteOption} value="KDB산업은행">
                    KDB산업은행
                  </option>
                  <option className={styles.whiteOption} value="신협">
                    신협
                  </option>
                  <option className={styles.whiteOption} value="한국씨티은행">
                    한국씨티은행
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>계좌번호</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="number"
                  inputmode="numeric"
                  placeholder="계좌번호 숫자만 입력"
                  onChange={(event) => handleChange(event, "SET_BANK_ACCOUNT")}
                  className={styles.numberpassword}
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%" }}
                  value={signUpState.bankAccount}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>환전 비밀번호</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="password"
                  id="bankPassword"
                  onChange={(event) => handleChange(event, "SET_BANK_PW")}
                  placeholder="8자리내로 입력"
                  maxLength={8}
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%" }}
                  value={signUpState.bankPW}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>예금주</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="text"
                  placeholder="계좌 이름 입력"
                  onChange={(event) => handleChange(event, "SET_BANK_OWNERNAME")}
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%" }}
                  value={signUpState.ownerName}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>매장</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="text"
                  id="rec"
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%", background: "white" }}
                  onChange={(event) => handleChange(event, "SET_STORE")}
                  placeholder="예시) WD001"
                  value={signUpState.store}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>추천인</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="text"
                  id="rec"
                  style={{ border: "1px solid #181D4B", width: "46.3%", height: "100%", background: "white" }}
                  onChange={(event) => handleChange(event, "SET_REFFERER")}
                  placeholder="예시) user1"
                  value={signUpState.referredBy}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerInner}>
          <button
            style={{
              height: "70.4%",
              width: "49.3%",
              border: "1px solid #FFF",
              background: "#ff0000",
              color: "#FFF",
              fontSize: "0.677vw",
            }}
            type="button"
            onClick={() => handleReset()}
          >
            초기화
          </button>
          <button
            style={{
              height: "70.4%",
              width: "49.3%",
              border: "1px solid #FFF",
              background: "#3A6287",
              color: "#FFF",
              fontSize: "0.677vw",
              marginLeft: "10px",
            }}
            onClick={sendSignUp}
          >
            확인
          </button>
        </div>
      </div>
    </form>
  )
}
