import React, { useEffect, useState } from "react"
import styles from "./[id].module.css"
import Layout from "@components/Layout"
import baseUrl from "@utils/REST/baseUrl"
import { useRouter } from "next/router"
import axios from "axios"
import { getCookie } from "cookies-next"
import { moneyLogStore } from "@utils/moneyLogStore/moneyLogStore"
import { toast } from "react-toastify"

export default function Index() {
  const router = useRouter()
  const { setUserId } = moneyLogStore()

  const [data, setData] = useState({
    title: "",
    content: "",
    createdAt: "",
    id: "",
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (router.isReady) {
      fetchData(router.query.id)
    }
  }, [router.isReady])

  const fetchData = async (id) => {
    try {
      const response = await axios.get(`${baseUrl}api/v2/users/message/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: getCookie("token"),
        },
      })
      setData(response.data)
      console.log(response.data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching data:", error)
      setLoading(false)
    }
  }

  const handleMoneyBtn = (event, id) => {
    event.preventDefault()
    event.stopPropagation()
    setUserId(id)
    return window.open("/Exchange/personalMoneyLog", "_blank", "width=1700,height=900")
  }
  const userDetailOpen = (event, id) => {
    event.stopPropagation()
    event.preventDefault()

    window.open(`/getUserInfoes/${id}`, "_blank", "width=1700,height=900")
  }

  return (
    <div className={styles.customerServiceDetailTableWrapper}>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className={styles.customerServiceDetailTable}>
          <colgroup>
            <col width={420}></col>
            <col width={580}></col>
            <col width={250}></col>
            <col width={414}></col>
          </colgroup>

          <thead>
            <tr>
              <th className={styles.title}>쪽지 </th>
              <th colSpan={3}></th>
            </tr>
          </thead>

          <tbody>
            <tr style={{ height: "60px" }}>
              <td>받은사람</td>
              <td>
                <input
                  type="text"
                  style={{ textAlign: "center" }}
                  placeholder="관리자"
                  value={data?.receiver.username}
                  defaultValue={data?.receiver.username}
                  disabled
                />
              </td>
              <td style={{ widht: "100px", background: "transparent !important" }}>
                <div className={styles.buttonBox}>
                  <button
                    type="button"
                    className={styles.buttonx}
                    onClick={(event) => userDetailOpen(event, data?.receiver?.id)}
                  >
                    상세 정보 (회원정보)
                  </button>
                  <button
                    type="button"
                    className={styles.buttonx}
                    onClick={(event) => handleMoneyBtn(event, data?.receiver?.id)}
                  >
                    머니 사용 로그
                  </button>
                </div>
              </td>
            </tr>

            <tr style={{ height: "50px" }}>
              <td>쪽지 제목 </td>
              <td colSpan={1}>
                <div className={styles.contents1}>{data?.title ? data?.title : ""}</div>
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td>쪽지 내용</td>
              <td colSpan={1}>
                <div className={styles.contents1} dangerouslySetInnerHTML={{ __html: data?.content }} />
              </td>
            </tr>
            <tr style={{ height: "50px" }}>
              <td>등록일자</td>
              <td colSpan={1}>
                <div>{data?.createdAt}</div>
              </td>
            </tr>
          </tbody>
        </table>
      )}
    </div>
  )
}

Index.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>
}
