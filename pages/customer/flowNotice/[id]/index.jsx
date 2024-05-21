import Layout from "@components/Layout"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import styles from "./eventDetail.module.css"
import { getCookie } from "cookies-next"
import CustomButton from "@components/customButton/CustomButton"
import axios from "axios"
import { boardStore } from "@utils/boardStore/boardStore"
import { toast } from "react-toastify"

export default function index() {
  const router = useRouter()
  const [flow, setFlow] = useState("")
  const { boardType } = boardStore()

  const sendToserver = async () => {
    const too = getCookie("token")
    const headers = { "Content-Type": "application/json", Authorization: too }
    if (router.query.id === "new") {
      try {
        // 각 상태에 대한 요청을 병렬적으로 실행
        const promises = axios.post(
          `https://dailymodelapp.com/api/v2/managers/flow/notices/create`,
          { content: flow },
          { headers },
        )

        toast.success("등록되었습니다")
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    } else {
      try {
        // 각 상태에 대한 요청을 병렬적으로 실행
        const promises = axios.put(
          `https://dailymodelapp.com/api/v2/managers/flow/notices/update/${router.query.id}`,
          { content: flow },
          { headers },
        )

        toast.success("수정되었습니다")
      } catch (error) {
        console.error("Error fetching data:", error)
      }
    }
  }
  async function delBtn(id) {
    const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }

    const baseUrl = `https://dailymodelapp.com/api/v2/managers/flow/notices/delete/${router.query.id}`

    try {
      await axios.delete(`${baseUrl}`, { headers: headers }).then((res) => {
        if (res.status >= 200 && res.status < 300) {
          toast.success("삭제되었습니다")
          return fetchLevelsData()
        }
      })
    } catch (error) {
      console.error("Error fetching data:", error)
      // 오류가 발생하면 빈 배열 또는 오류 메시지를 반환할 수 있습니다.
      return []
    }
  }
  return (
    <div className={styles.eventDetailTableWrapper}>
      <table className={styles.eventDetailTable}>
        <colgroup>
          <col width={420}></col>
          <col width={580}></col>
          <col width={250}></col>
          <col width={414}></col>
        </colgroup>

        <thead>
          <tr>
            <th className={styles.title}>흐르는공지</th>
            <th colSpan={3}></th>
          </tr>
        </thead>

        <tbody>
          <tr style={{ height: "200px" }}>
            <td>글내용</td>
            <td colSpan={3}>
              <textarea
                name="flow"
                style={{ width: "100%", height: "10vw" }}
                onChange={(event) => setFlow(event.target.value)}
                defaultValue={boardType.contents}
              />
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.btnWrapper}>
        {/* <CustomButton
          customStyle={{
            width: "120px",
            height: "22px",
            backgroundColor: "#696969",
            color: "white",
            marginRight: "3px",
          }}
          text={"수정하기"}
        /> */}
        <button
          style={{
            width: "120px",
            height: "22px",
            backgroundColor: "#696969",
            color: "white",
            marginRight: "3px",
            fontSize: "13px",
          }}
          onClick={() => delBtn()}
        >
          삭제하기
        </button>
        <button
          style={{ width: "120px", height: "22px", backgroundColor: "#696969", color: "white" }}
          onClick={() => router.push("/customer/flowNotice")}
        >
          목록으로
        </button>
      </div>

      <div className={styles.bottomBtnWrapper}>
        <div className={styles.templateBtnWrapper}>
          <CustomButton
            customStyle={{
              width: "120px",
              height: "22px",
              backgroundColor: "#696969",
              color: "white",
              marginRight: "3px",
            }}
            text={"[내반대템플릿]"}
          />
          <CustomButton
            customStyle={{
              width: "120px",
              height: "22px",
              backgroundColor: "#696969",
              color: "white",
              marginRight: "3px",
            }}
            text={"[연승템플릿]"}
          />
          <CustomButton
            customStyle={{ width: "120px", height: "22px", backgroundColor: "#696969", color: "white" }}
            text={"[연패템플릿]"}
          />
        </div>
        <div className={styles.saveBtnWrapper}>
          <button
            style={{
              width: "150px",
              height: "30px",
              backgroundColor: "#0000FF",
              color: "white",
              borderRadius: "5px",
              marginTop: "10px",
            }}
            onClick={() => sendToserver()}
          >
            저장하기
          </button>
        </div>
      </div>
    </div>
  )
}
// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
