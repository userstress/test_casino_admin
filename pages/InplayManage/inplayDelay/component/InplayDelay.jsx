import CustomHeader from "@components/customHeader/CustomHeader"
import CustomTable from "@components/customTable/CustomTable"
import styles from "./InplayDelay.module.css"
import useAxiosRequest from "@utils/REST/Chook/useAxiosRequest"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import { useRouter } from "next/router"
import { getCookie } from "cookies-next"
import ArrayToMap, { handleMapChange, mapOfMapsToArray } from "@utils/ArrayToMap"
// 37번 블랙리스트 랙
export default function InplayDelay() {
  const router = useRouter()
  const { sendRequest } = useAxiosRequest()
  const mytoken = getCookie("token")
  const [tableData, setData] = useState()
  const [tableDataTrans, setTransData] = useState(new Map())

  const asdf = [
    {
      id: 1,
      sports: "BaseBall",
      singleBetDelay: 5,
      multiBetDelay: 10,
      singleBetDelay2: 15,
      multiBetDelay2: 20,
      priceGap: 1.5,
      functions: "Edit",
      functions2: "Delete",
    },
    {
      id: 2,
      sports: "Football",
      singleBetDelay: 6,
      multiBetDelay: 12,
      singleBetDelay2: 18,
      multiBetDelay2: 24,
      priceGap: 2.0,
      functions: "Edit",
      functions2: "Delete",
    },
    {
      id: 3,
      sports: "basketball",
      singleBetDelay: 7,
      multiBetDelay: 14,
      singleBetDelay2: 21,
      multiBetDelay2: 28,
      priceGap: 2.5,
      functions: "Edit",
      functions2: "Delete",
    },
  ]

  function handleInputCell(val) {
    setData(mapOfMapsToArray(val))
    setTransData(val)
  }
  const columns = [
    { field: "id", headerName: "No.", flex: 1, align: "center" },
    {
      field: "sports",
      headerName: "스포츠",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <select
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "sports", event.target.value, tableDataTrans))
            }
          >
            <option value="BaseBall">야구</option>
            <option value="Football">축구</option>
            <option value="basketball">농구</option>
            <option value="volleyball">배구</option>
          </select>
        )
      },
    },
    {
      field: "singleBetDelay",
      headerName: "단폴지연시간",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <input
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "singleBetDelay", event.target.value, tableDataTrans))
            }
          />
        )
      },
    },
    {
      field: "multiBetDelay",
      headerName: "다폴지연시간",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <input
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "multiBetDelay", event.target.value, tableDataTrans))
            }
          />
        )
      },
    },
    {
      field: "singleBetDelay2",
      headerName: "단폴 지연시간2",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <input
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "singleBetDelay2", event.target.value, tableDataTrans))
            }
          />
        )
      },
    },
    {
      field: "multiBetDelay2",
      headerName: "다폴 지연시간2",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <input
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "multiBetDelay2", event.target.value, tableDataTrans))
            }
          />
        )
      },
    },
    {
      field: "priceGap",
      headerName: "배당차",
      flex: 1,
      align: "center",
      renderCell: (params) => {
        return (
          <input
            onChange={(event) =>
              handleInputCell(handleMapChange(params.row.id, "priceGap", event.target.value, tableDataTrans))
            }
          />
        )
      },
    },
    {
      field: "functions",
      headerName: "기능",
      flex: 1,
      align: "center",
    },
    {
      field: "functions2",
      headerName: "기능2",
      flex: 1,
      align: "center",
    },
  ]

  const [datdas, setDatas] = useState([])
  function reQuestJson() {
    const method = "GET"
    const url = "/api/v2/managers/ips?page=1&size=100"
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    sendRequest(method, url, headers, null, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("중복된 회원정보 입니다.")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        return setDatas(responseData.data.data)
      }
    })
  }

  useEffect(() => {
    // reQuestJson()
    if (router.isReady) {
      setData(asdf)
      setTransData(ArrayToMap(asdf))
    }
  }, [router.isReady])

  const [ips, setIps] = useState({
    first: "",
    second: "",
    third: "",
    forth: "",
    memo: "",
  })

  function handleInput(event, idx) {
    const vals = event.target.value
  }
  function sendIps() {
    const method = "POST"
    const url = "api/v2/managers/ip"
    const body = { ipContent: `${ips.first}:${ips.second}:${ips.third}:${ips.forth}`, note: ips.memo, enabled: false }
    const headers = { "Content-Type": "application/json", Authorization: mytoken }
    sendRequest(method, url, headers, body, (errorStatus, responseData) => {
      if (errorStatus >= 500) {
        toast.warn("서버 반응이 없습니다")
      } else if (errorStatus === 400) {
        toast.warn("올바르지 않은 입력 값입니다.")
      } else if (errorStatus === 403 || errorStatus === 401) {
        toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })
      } else if (errorStatus === 404) {
        toast.error("서버 응답이 없습니다.")
      } else if (!errorStatus && responseData) {
        toast.success("등록하였습니다.", {
          onClose: () => reQuestJson(),
        })
      }
    })
  }
  return (
    <>
      <div className={styles.boxContainer}>
        <CustomHeader
          text={"인플레이 악성 시간 관리 (큰수 우선 적용) 목록"}
          customStyle={{ height: "1.979vw", width: "100%", backgroundColor: "#5386B5" }}
        />

        <div className={styles.tableContainer}>
          <CustomTable columns={columns} rows={tableData ? tableData : []} checkbox={false} />
        </div>
        <div className={styles.addWrapper}>
          <section className={styles.addIpBox}>
            <div className={styles.inputBox}>
              <section className={styles.inputBox1}>
                <div className={styles.ComplexBox}>
                  <div className={styles.topbox}>
                    <div className={styles.inputCover}>종목</div>
                    <div className={styles.inputCover}>단폴 지연시간(초)</div>
                    <div className={styles.inputCover}>다폴 지연시간(초)</div>
                    <div className={styles.inputCover}>단폴 지연시간2(초)</div>
                    <div className={styles.inputCover}>다폴 지연시간2(초)</div>
                    <div className={styles.inputCover}>배당차</div>
                  </div>
                  <div className={styles.topbox}>
                    <div className={styles.inputCover}>
                      <select>
                        <option value="">야구</option>
                        <option value="">축구</option>
                        <option value="">농구</option>
                        <option value="">배구</option>
                        <option value="">핸드볼</option>
                        <option value="">아이스 하키</option>
                        <option value="">미식축구</option>
                        <option value="">탁구</option>
                      </select>
                    </div>
                    <div className={styles.inputCover}>
                      <input type="number" onChange={(event) => handleInput(event)} min="0" />
                    </div>
                    <div className={styles.inputCover}>
                      <input type="number" onChange={(event) => handleInput(event)} min="0" />
                    </div>
                    <div className={styles.inputCover}>
                      <input type="number" onChange={(event) => handleInput(event)} min="0" />
                    </div>
                    <div className={styles.inputCover}>
                      <input type="number" onChange={(event) => handleInput(event)} min="0" />
                    </div>
                    <div className={styles.inputCover}>
                      <input type="number" onChange={(event) => handleInput(event)} min="0" />
                    </div>
                  </div>
                </div>

                <button type="button" className={styles.buttonBox} onClick={() => sendIps()}>
                  등록
                </button>
              </section>
            </div>
          </section>
        </div>
      </div>
    </>
  )
}
