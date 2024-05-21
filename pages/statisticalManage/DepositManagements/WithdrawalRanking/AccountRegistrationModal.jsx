import React, { useState } from "react"
import { Modal, Fade, Box } from "@mui/material"
import styles from "./WithdrawalRanking.module.css"
import Backdrop from "@mui/material/Backdrop"
import Button from "@mui/material/Button"
import { toast } from "react-toastify"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { getCookie } from "cookies-next"
import axios from "axios"

const AccountRegistrationModal = ({ inputObj, setObj, hasDefault, accountArray, setAccount }) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const userToken = getCookie("token")
  const { sendRequest } = useAxiosRequest()

  // 여기에 모달 내부 입력 핸들링 로직...

  function getAllCookies() {
    const cookies = document.cookie.split("; ")
    const cookieMap = {}

    cookies.forEach((cookie) => {
      const [name, value] = cookie.split("=")
      cookieMap[name] = decodeURIComponent(value)
    })

    return cookieMap
  }

  const axiosInstance = axios.create({
    baseURL: "https://dailymodelapp.com",
    withCredentials: true, // 모든 요청에 withCredentials 옵션을 적용
    headers: {
      "Content-Type": "application/json",
      Authorization: userToken,
    },
  })

  function getSessionList() {
    console.log("getSessionList 실행 시작")
    toast.success("전송시작")
    axiosInstance
      .get("/api/v2/managers/difference-statistic/all")
      .then((response) => {
        setAccount(response.data) // 데이터 설정
      })
      .catch((error) => {
        console.log("데이터 전송 실패", error)
        const status = error.response ? error.response.status : 500
        // 에러 처리
        if (status >= 500) {
          toast.warn("중복된 회원정보 입니다.")
        } else if (status === 400) {
          toast.warn("올바르지 않은 입력 값입니다.")
        } else if (status === 403 || status === 401) {
          toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
        } else if (status === 404) {
          toast.error("서버 응답이 없습니다.")
        }
      })
  }

  function saveToseSetion() {
    const body = {
      turn: inputObj.turn,
      usage: inputObj.usage,
      ownerName: inputObj.ownerName,
      number: inputObj.number,
      source: inputObj.source,
      use: inputObj.use,
      transferLimit: inputObj.transferLimit,
      currentMoney: inputObj.currentMoney,
      memo: inputObj.memo,
    }

    axiosInstance
      .post("/api/v2/managers/difference-statistic/insert/account", body)
      .then((response) => {
        toast.success("저장되었습니다")
        getSessionList()
      })
      .catch((error) => {
        const status = error.response ? error.response.status : 500
        // 에러 처리
        if (status >= 500) {
          toast.warn("중복된 회원정보 입니다.")
        } else if (status === 400) {
          toast.warn("올바르지 않은 입력 값입니다.")
        } else if (status === 403 || status === 401) {
          toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
        } else if (status === 404) {
          toast.error("서버 응답이 없습니다.")
        }
      })
  }

  return (
    <>
      <Button onClick={handleOpen} sx={{ fontSize: "13px" }}>
        계좌 등록하기
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        BackdropProps={{ style: { backgroundColor: "transparent", opacity: 0 } }} // 배경을 투명하게 만듭니다.
        sx={{
          top: "20vh",
          left: "30vw",
          backgroundColor: "white",
          border: "solid 1px #bbbbbb",
          width: "40vw",
          height: "650px",
        }}
      >
        <Fade in={open}>
          <Box sx={{ padding: "10px", color: "black !important" }}>
            <div className={styles.accountAdd}>계좌 등록</div>
            <section>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>등록일</span>
                <span className={styles.detailContents}>2023-10-20 17:05:30</span>
              </div>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>순번</span>
                <span className={styles.detailContents}>
                  <input
                    id="순번"
                    onChange={(event) => setObj({ ...inputObj, turn: event.target.value })}
                    type="number"
                    defaultValue={hasDefault ? hasDefault.turn : null}
                  />
                </span>
              </div>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>용도</span>
                <span className={styles.detailContents}>
                  <select
                    defaultValue={hasDefault ? hasDefault.usage : "카지노캐시"}
                    onChange={(event) => setObj({ ...inputObj, usage: event.target.value })}
                  >
                    <option value="카지노캐시">카지노 캐시</option>
                    {/* <option value="예비">예비</option> */}
                    <option value="앞방">앞방</option>
                    <option value="중간방">중간방</option>
                    <option value="뒷방">뒷방</option>
                    <option value="현금">현금</option>
                  </select>
                </span>
              </div>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>예금주</span>
                <span className={styles.detailContents}>
                  <input
                    type="text"
                    id="예금주"
                    defaultValue={hasDefault ? hasDefault.ownerName : null}
                    onChange={(event) => setObj({ ...inputObj, ownerName: event.target.value })}
                  />
                </span>
              </div>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>계좌번호</span>
                <span className={styles.detailContents}>
                  <input
                    type="text"
                    id="계좌번호"
                    defaultValue={hasDefault ? hasDefault.number : null}
                    onChange={(event) => setObj({ ...inputObj, number: event.target.value })}
                  />
                </span>
              </div>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>출처</span>
                <span className={styles.detailContents}>
                  <input
                    type="text"
                    id="출처"
                    defaultValue={hasDefault ? hasDefault.source : null}
                    onChange={(event) => setObj({ ...inputObj, source: event.target.value })}
                  />
                </span>
              </div>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>사용여부</span>
                <span className={styles.detailContents}>
                  <select
                    name=""
                    id="사용여부"
                    defaultValue={hasDefault ? hasDefault.use : null}
                    onChange={(event) => setObj({ ...inputObj, use: event.target.value })}
                  >
                    {" "}
                    <option value={true}>사용</option>
                    <option value={false}>미사용</option>
                  </select>
                </span>
              </div>

              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>이체한도</span>
                <span className={styles.detailContents}>
                  <input
                    type="text"
                    id="이체한도"
                    defaultValue={hasDefault ? hasDefault.transferLimit : null}
                    onChange={(event) => setObj({ ...inputObj, transferLimit: event.target.value })}
                  />
                </span>
              </div>
              <div className={styles.modalTable}>
                <span className={styles.detailTitle}>보유금액</span>
                <span className={styles.detailContents}>
                  <input
                    type="text"
                    id="보유금액"
                    defaultValue={hasDefault ? hasDefault.currentMoney : null}
                    onChange={(event) => setObj({ ...inputObj, currentMoney: event.target.value })}
                  />
                </span>
              </div>
            </section>
            <textarea
              onChange={(event) => setObj({ ...inputObj, memo: event.target.value })}
              defaultValue={hasDefault ? hasDefault.memo : null}
              className={styles.memofor}
            />
            <div className={styles.submits}>
              <button
                className={styles.buttonsSubmit1}
                onClick={hasDefault ? () => patchTosesetion() : () => saveToseSetion()}
              >
                계좌 등록
              </button>
            </div>
          </Box>
        </Fade>
      </Modal>
    </>
  )
}

export default AccountRegistrationModal
