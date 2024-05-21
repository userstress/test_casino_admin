import React, { useReducer, useState } from "react"
import styles from "./CustomDistributerSignin.module.css"
import CustomHeader from "@components/customHeader/CustomHeader"
import CustomButton from "@components/customButton/CustomButton"
import { toast } from "react-toastify"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useAuthStore } from "@utils/useAuthStore"

// 118 총판 관리
export default function CustomDistributerSignin() {
  const initialState = {
    userid: "",
    password: "",
    confirmPassword: "",
    phoneNumberFirst: "0",
    bankAccount: "",
    bankName: "",
  }
  // 초기 상태 정의

  const actionTypes = {
    setUsername: "SET_USERID",
    setPassword: "SET_PASSWORD",
    setConfirmPassword: "SET_CONFIRM_PASSWORD",
    setphoneNumberFirst: "SET_NUMBER_FIRST",
    setBankAccount: "SET_BANK_ACCOUNT",
    setBankName: "SET_BANK_NAME",
  }
  const useridRegex = /^[a-zA-Z0-9]{0,12}$/ // 4~12자의 알파벳 또는 숫자
  const passwordRegex = /^[a-zA-Z0-9!@#$%^&*\\+=]{4,14}$/
  const phoneRegex = /^[0-9]{1,3}$/
  const AccountNumber = /^[0-9]{5,14}$/

  const svgs = new Array(6).fill(null)

  // 리듀서 함수 정의
  const reducer = (state, action) => {
    switch (action.type) {
      case actionTypes.setUsername: {
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
        return { ...state, BirthSecond: value }
      }
      case actionTypes.setphoneNumberFirst: {
        const value = action.payload
        console.log(value)
        return { ...state, phoneNumberFirst: value }
      }
      case actionTypes.setphoneNumberSecond: {
        const value = action.payload
        return { ...state, phoneNumberSecond: value }
      }
      case actionTypes.setphoneNumberThird: {
        const value = action.payload
        return { ...state, phoneNumberThird: value }
      }
      case actionTypes.setBankAccount: {
        const value = action.payload
        return { ...state, bankAccount: value }
      }
      case actionTypes.setBankUserName: {
        const value = action.payload
        return { ...state, bankuserName: value }
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
      case actionTypes.setRecommandUser: {
        const value = action.payload
        return { ...state, recommandUser: value }
      }
      default:
        return state
    }
  }
  const [signUpState, dispatch] = useReducer(reducer, initialState)

  const handleChange = (event, actionType) => {
    console.log(event.target.value, actionType)
    dispatch({
      type: actionType,
      payload: event.target.value,
    })
  }
  const { sendRequest } = useAxiosRequest()
  const { userToken } = useAuthStore()

  const sendSignUp = async (event) => {
    event.preventDefault()
    if (!useridRegex.test(signUpState.userid.trim())) {
      return toast.error("아이디를 옳바르게 입력해 주세요", {})
    }
    if (!passwordRegex.test(signUpState.password.trim())) {
      return toast.error("비밀번호를 옳바르게 입력해 주세요", {})
    }
    if (!passwordRegex.test(signUpState.confirmPassword.trim())) {
      return toast.error("비밀번호 재확인을 옳바르게 입력해 주세요", {})
    }
    if (signUpState.password.trim() !== signUpState.confirmPassword.trim()) {
      return toast.error("두 비밀번호가 일치하지 않습니다.", {})
    }

    if (!phoneRegex.test(Number(signUpState.phoneNumberFirst.trim()))) {
      return toast.error("0~100까지만 입력해주세요", {})
    }

    if (!AccountNumber.test(signUpState.bankAccount.trim())) {
      return toast.error("수수료율은 0~100까지의 숫자만 입력 해 주세요.", {})
    }

    event.preventDefault()
    const method = "POST"
    const url = "/api/v2/register/user"
    const headers = { Authorization: `${userToken}`, "Content-Type": "application/json" }
    const body = {
      username: signUpState.userid,
      password: signUpState.password,
      phone: signUpState.phoneNumberFirst,
      number: signUpState.bankAccount,
      bankName: signUpState.bankName,
    }

    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("회원가입 신청이 완료되었습니다.", {
          onClose: () => router.push("/"),
        })
      }
      return false
    })
    return false
  }

  return (
    <form className={styles.boxContainer} onSubmit={sendSignUp}>
      <div className={styles.boxInner}>
        <CustomHeader
          text={"총판 등록"}
          customStyle={{ background: "#3A6287", height: "1.979vw", fontSize: "1.042vw" }}
        />
        <div className={styles.sectionContainer}>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>총판 아이디</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="text"
                  id="id"
                  onChange={(event) => handleChange(event, "SET_USERID")}
                  maxLength={12}
                  style={{ border: "1px solid #181D4B", width: "40%", height: "100%" }}
                />
                <CustomButton
                  text={"중복확인"}
                  customStyle={{ width: "15%", background: "#0B73D2", color: "white" }}
                ></CustomButton>
                <div className={styles.colorRed}>영문, 숫자 4~12자 (특수 문자 !@#$%^&* 가능)</div>
              </div>
            </div>
          </div>

          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>비밀번호</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="password"
                  id="nickname"
                  onChange={(event) => handleChange(event, "SET_PASSWORD")}
                  maxLength={14}
                  className={styles.inputPassword}
                  style={{ border: "1px solid #181D4B", width: "40%", height: "100%" }}
                />
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>비밀번호 확인</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="password"
                  id="checkpw"
                  onChange={(event) => handleChange(event, "SET_CONFIRM_PASSWORD")}
                  maxLength={14}
                  style={{ border: "1px solid #181D4B", width: "40%", height: "100%" }}
                />
                <CustomButton
                  text={"중복확인"}
                  customStyle={{ width: "15%", background: "#0B73D2", color: "white" }}
                ></CustomButton>
                <div className={styles.colorRed}>영문, 숫자 4~12자 (특수 문자 !@#$%^&* 가능)</div>
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>수수료율</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="number"
                  inputmode="numeric"
                  onChange={(event) => handleChange(event, "SET_NUMBER_FIRST")}
                  className={styles.numberpassword}
                  style={{ border: "1px solid #181D4B", width: "40%", height: "100%" }}
                  id="Ratio"
                />
                <span style={{ width: "20%" }}>%</span>
                <label htmlFor="Ratio" className={styles.colorRed}>
                  *숫자만 입력하세요 0~100 (예 : 10)
                </label>
              </div>
            </div>
          </div>
          <div className={styles.sectionInner}>
            <div className={styles.sectionContent1}>홀덤 수수료율</div>
            <div className={styles.sectionContent2}>
              <div className={styles.sectionContent2Inner}>
                <input
                  type="number"
                  inputmode="numeric"
                  onChange={(event) => handleChange(event, "SET_BANK_ACCOUNT")}
                  className={styles.numberpassword}
                  style={{ border: "1px solid #181D4B", width: "40%", height: "100%" }}
                  id="holdomRatio"
                />
                <span style={{ width: "20%" }}>%</span>

                <label htmlFor="holdomRatio" className={styles.colorRed}>
                  *숫자만 입력하세요 0~100 (예 : 10)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.footerContainer}>
        <div className={styles.footerInner}>
          <CustomButton
            text={"확인"}
            customStyle={{
              height: "59.4%",
              width: "49.3%",
              border: "1px solid #FFF",
              background: "#3A6287",
              color: "#FFF",
              fontSize: "0.677vw",
            }}
            onClick={sendSignUp}
          />
          <CustomButton
            text={"취소"}
            customStyle={{
              height: "59.4%",
              width: "49.3%",
              border: "1px solid #FFF",
              background: "#3A6287",
              color: "#FFF",
              fontSize: "0.677vw",
            }}
          />
        </div>
      </div>
    </form>
  )
}
