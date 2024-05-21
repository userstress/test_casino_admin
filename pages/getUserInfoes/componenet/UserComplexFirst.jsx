import React, { useEffect, useState } from "react"
import styles from "./UserComplexFirst.module.css"
import { addCommasToNumber, addCommasToNumber2 } from "@utils/formatNumberWithCommas"
import ReffererTree from "./extraComponent/ReffererTree"
import { toast } from "react-toastify"

function UserComplexFirst({ data, handleInput }) {
  if (!data) {
    return null
  }
  const [selectedLevel, setSelectedLevel] = useState(data?.lv || "")
  const [selectedStat, setSelectedstat] = useState(data?.lv || "")

  const handlelvChange = (event) => {
    setSelectedLevel(event.target.value)
  }
  const handlestatChange = (event) => {
    setSelectedstat(event.target.value)
  }

  useEffect(() => {}, [data])

  function generateCode() {
    toast.success("발급중입니다")
    // const method = "PATCH"
    // const url = `/api/v2/admins/users/${router.query.index}`
    // const headers = { "Content-Type": "application/json", Authorization: getCookie("token") }
    // const body = cleanObject(values)

    // sendRequest(method, url, headers, body, (errorStatus, responseData) => {
    //   if (errorStatus >= 500) {
    //     toast.warn("관리자에게 문의 해 주세요.")
    //   } else if (errorStatus === 400) {
    //     toast.warn("올바르지 않은 입력 값입니다.")
    //   } else if (errorStatus === 403 || errorStatus === 401) {
    //             toast.warn("로그아웃되었습니다.", { onClose: () => window.location.assign("/") })

    //   } else if (errorStatus === 404) {
    //     toast.error("서버 응답이 없습니다.")
    //   } else if (!errorStatus && responseData) {
    //     toast.success("유저 정보를 변경하였습니다")
    //     fetchData()
    //   }
    // })
  }

  return (
    <div className={styles.GridWrappers}>
      <div className={styles.gridSectors}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>아이디</div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={data?.username} disabled />
          </div>
        </section>
        <section className={styles.gridRightSideSector}>
          <div className={styles.nameSide}>비밀번호</div>
          <div className={styles.TextSide}>
            <input type="text" placeholder="바꾸실 비밀번호를 입력해 주세요" name="password" onChange={handleInput} />
          </div>
        </section>
      </div>
      <div className={styles.gridSectors}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>닉네임</div>
          <div className={styles.TextSide}>
            <input name="nickname" onChange={handleInput} defaultValue={data?.nickname} />
          </div>
        </section>
        <section className={styles.gridRightSideSector}>
          <div className={styles.nameSide}>보유머니</div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={`${addCommasToNumber(data?.wallet?.sportsBalance)}`} disabled />
          </div>
          <div className={styles.nameSide} style={{ borderTop: "solid 1px black" }}>
            카지노머니
          </div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={`${addCommasToNumber(data?.wallet?.casinoBalance)}`} disabled />
          </div>
        </section>
      </div>
      <div className={styles.gridSectors}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>핸드폰</div>
          <div className={`${styles.TextSide}, ${styles.phoneSetting}`}>
            <input type="text" defaultValue={data?.phone} name="phone" onChange={handleInput} />

            <div className={styles.phoneCheckboxes}>
              <div className={styles.phoneSettingInner}>
                <input
                  type="checkbox"
                  htmlFor="smsReceipt"
                  defaultValue={data?.smsReceipt}
                  name="smsReceipt"
                  onChange={handleInput}
                />
                <div id="smsReceipt">sms 수신여부</div>
              </div>
              <div className={styles.phoneSettingInner}>
                <input
                  type="checkbox"
                  htmlFor="amazonVisible"
                  defaultValue={data?.amazonVisible}
                  name="amazonVisible"
                  onChange={handleInput}
                />
                <div id="amazonVisible">총판 페이지 노출</div>
              </div>
              <div className={styles.phoneSettingInner}>
                <input
                  type="checkbox"
                  htmlFor="accountVisible"
                  defaultValue={data?.accountVisible}
                  name="accountVisible"
                  onChange={handleInput}
                />
                <div id="accountVisible">계좌 비공개</div>
              </div>
            </div>
          </div>
        </section>
        <section className={styles.gridRightSideSector}>
          <div className={styles.nameSide}>이메일</div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={data?.email} name="email" onChange={handleInput} />
          </div>
        </section>
      </div>
      <div className={styles.gridSectors}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>은행명</div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={data?.wallet?.bankName} name="bankName" onChange={handleInput} />
          </div>
        </section>

        <section className={styles.gridRightSideSector}>
          <div className={styles.nameSide}>계좌번호</div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={data?.wallet?.number} name="number" onChange={handleInput} />
          </div>
        </section>
      </div>

      <div className={styles.gridSectors}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>예금주</div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={data?.wallet?.ownerName} name="ownerName" onChange={handleInput} />
          </div>
        </section>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>회원상태</div>
          <div className={styles.eventDiv}>
            <select className={styles.eventOption} defaultValue={data?.lv} name="lv" onChange={handleInput}>
              <option value="1">레벨1</option>
              <option value="2">레벨2</option>
              <option value="3">레벨3</option>
              <option value="4">레벨4</option>
              <option value="5">레벨5</option>
              <option value="6">레벨6</option>
              <option value="7">레벨7</option>
              <option value="8">레벨8</option>
              <option value="9">레벨9</option>
              <option value="10">레벨10</option>
            </select>
            <select
              className={styles.eventOption}
              defaultValue={data?.userGubunEnum}
              name="userGubunEnum"
              onChange={handleInput}
            >
              <option value="nomal">정상</option>
              <option value="waiting">대기</option>
              <option value="suspend">정지</option>
              <option value="banned">탈퇴</option>
            </select>
          </div>
        </section>
      </div>
      <section className={styles.gridSectors}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>추천인</div>
          <div className={`${styles.TextSide}, ${styles.BoardBox}`}>
            <input id="referrers" name="referredBy" value={data?.referredBy} disabled />
            <label htmlFor="referrers">정보 보기</label>
          </div>
        </section>

        <section className={styles.complexBox}>
          <div className={styles.fixBtnxs}>
            <div className={styles.nameSide} style={{ borderBottom: "solid 1px black" }}>
              가상계좌 사용 유무
            </div>
            <div className={styles.vAccountBox} style={{ borderBottom: "solid 1px black" }}>
              <select
                className={styles.vaccount}
                defaultValue={data?.virtualAccountEnabled}
                name="virtualAccountEnabled"
                onChange={handleInput}
              >
                <option value={true}>사용</option>
                <option value={false}>미사용</option>
              </select>
              <div className={styles.inputLabelss}>
                <label htmlFor="virtualAccountOwnerName" value="event1">
                  예금주:
                </label>
                <input
                  id="virtualAccountOwnerName"
                  className={styles.vaccountInput1}
                  defaultValue={data?.virtualAccountOwnerName}
                  name="virtualAccountOwnerName"
                  onChange={handleInput}
                />
              </div>
              <div className={styles.inputLabelss}>
                <label htmlFor="virtualAccountNumber">계좌번호:</label>
                <input
                  id="virtualAccountNumber"
                  className={styles.vaccountInput2}
                  defaultValue={data?.virtualAccountNumber}
                  name="virtualAccountNumber"
                  onChange={handleInput}
                />
              </div>
            </div>
          </div>

          <div className={styles.fixBtnxs}>
            <div className={styles.nameSide}>카톡 유무/텔레그램 유무</div>
            <div className={styles.telegramBox}>
              <select
                className={styles.teleboxTop}
                style={{ width: "50%" }}
                defaultValue={data?.kakaoRegistered}
                name="kakaoRegistered"
                onChange={handleInput}
              >
                <option value={true}>카톡있음</option>
                <option value={false}>카톡없음</option>
              </select>
              <select
                style={{ width: "50%" }}
                className={styles.teleboxBttom}
                defaultValue={data?.telegramRegistered}
                name="telegramRegistered"
                onChange={handleInput}
              >
                <option value={true}>텔레그램 등록됨</option>
                <option value={false}>등록안됨</option>
              </select>
            </div>
          </div>
        </section>
      </section>
      <div className={styles.gridComplexes}>
        <div style={{ width: "50%" }}>
          <seciton
            className={styles.complexChild}
            style={{ borderBottom: "solid 1px black", borderTop: "solid 1px black" }}
          >
            <div className={styles.nameSide}>추천인 코드/ 족보</div>
            <div style={{ padding: "4px" }}>
              <div>발급된 코드: labels</div>
              <button
                type="button"
                style={{
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: "#FF0000",
                  color: "white",
                  width: "50px",
                }}
                onClick={() => generateCode()}
              >
                생성
              </button>
            </div>
          </seciton>
          <section className={styles.complexChild} style={{ borderBottom: "solid 1px black" }}>
            <div className={styles.nameSide}>추천횟수 & 추천가능</div>
            <div className={styles.eventDiv}>
              <input type="text" defaultValue={data?.recommendedCount} disabled />
              <select
                className={styles.eventOption2}
                defaultValue={data?.canRecommend}
                name="canRecommend"
                onChange={handleInput}
              >
                <option value={true}>추천가능</option>
                <option value={false}>추천불가</option>
              </select>
            </div>
          </section>
          <section className={styles.complexChild}>
            <div className={styles.nameSide} style={{ borderBottom: "solid 1px black" }}>
              가입사이트(총판/매장)
            </div>
            <div className={styles.spaceAround}>
              <input type="text" defaultValue={data?.distributor} disabled />
              /
              <input type="text" defaultValue={data?.store} disabled />
            </div>
          </section>
        </div>
        <section className={styles.rightBoxComplex} style={{ width: "50%" }}>
          <div className={styles.nameSide} style={{ borderTop: "solid 1px black" }}>
            관계도
          </div>
          <ul className={styles.referrerList} style={{ paddingLeft: "4px", listStyle: "none" }}>
            {<ReffererTree referrerInfo={data?.referrerInfo} />}
          </ul>
        </section>
      </div>
      <div className={styles.gridSectors}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide} style={{ borderBottom: "solid 1px black" }}>
            포인트
          </div>
          <div className={styles.TextSide}>
            <input type="text" defaultValue={addCommasToNumber2(data?.wallet?.point)} disabled />
          </div>
        </section>
        <section className={styles.gridRightSideSector}>
          <div className={styles.nameSide}>모니터링/충전모니터링</div>
          <div className={styles.TextSide}>
            <select name="" id="" style={{ width: "50%" }} defaultValue={data?.monitoringStatus}>
              <option value="정상">정상</option>
              <option value="주시베팅">주시베팅</option>
              <option value="초과베팅">초과베팅</option>
            </select>
          </div>
        </section>
      </div>
      <section className={styles.gridSectorWIDTH}>
        <div className={styles.nameSide}>베팅관리</div>
        <div className={`${styles.TextSide}`}>
          <figure className={styles.selectTotalBox}>
            <div className={styles.selectSet}>
              <select>
                <option value="">단폴더 베팅 0</option>
              </select>
              <select>
                <option value="">사다리 베팅 0</option>
              </select>
              <select>
                <option value="">파워볼 베팅 0</option>
              </select>
              <select>
                <option value="">달팽이 베팅 0</option>
              </select>
              <select>
                <option value="">다리다리 베팅 0</option>
              </select>
              <select>
                <option value="">라이브 베팅 0</option>
              </select>
              <select>
                <option value="">MGM홀짝 베팅 0</option>
              </select>
              <select>
                <option value="">MGM홀짝 베팅 0</option>
              </select>
              <select>
                <option value="">MGM바카라 베팅 0</option>
              </select>
              <select>
                <option value="">키노사다리 베팅 0</option>
              </select>
              <select>
                <option value="">키노파워볼 베팅 0</option>
              </select>
              <select>
                <option value="">스피드키노 베팅 0</option>
              </select>
            </div>
            <div className={styles.selectSet}>
              <select>
                <option value="">가축 베팅 0</option>
              </select>
              <select>
                <option value="">애플 베팅 0</option>
              </select>
              <select>
                <option value="">로투스 베팅 0</option>
              </select>
              <select>
                <option value="">올벳 베팅 0</option>
              </select>
              <select>
                <option value="">타이샨 베팅 0</option>
              </select>
              <select>
                <option value="">WM 베팅 0</option>
              </select>
              <select>
                <option value="">에볼루션 베팅 0</option>
              </select>
              <select>
                <option value="">마이크로 베팅 0</option>
              </select>
              <select>
                <option value="">AG 베팅 0</option>
              </select>
              <select>
                <option value="">슬롯 베팅 0</option>
              </select>
              <select>
                <option value="">뉴썬 베팅 0</option>
              </select>
            </div>
            <div className={styles.selectSet} style={{ borderBottom: "solid 1px black" }}>
              <select>
                <option value="">파이쟈 베팅 0</option>
              </select>
              <select>
                <option value="">PP 카지노 베팅 0</option>
              </select>
              <select>
                <option value="">VIVO 베팅 0</option>
              </select>
              <select>
                <option value="">빅팟 베팅 0</option>
              </select>
              <select>
                <option value="">드림 베팅 0</option>
              </select>
            </div>
          </figure>
        </div>
      </section>
      <div className={styles.gridSectors} style={{ borderBottom: "solid 1px black" }}>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>게시판 글작성</div>
          <select style={{ width: "50%" }} defaultValue={data?.canPost} name="canPost" onChange={handleInput}>
            <option value={true}>가능</option>
            <option value={false}>불가능</option>
          </select>
        </section>
        <section className={styles.gridLeftSideSector}>
          <div className={styles.nameSide}>댓글작성</div>
          <select style={{ width: "50%" }} name="canComment" onChange={handleInput} defaultValue={data?.canComment}>
            <option value={true}>가능</option>
            <option value={false}>불가능</option>
          </select>
        </section>
      </div>
      <section className={styles.gridSectorWIDTH}>
        <div className={styles.nameSide}>추가충전</div>
        <div className={`${styles.TextSide}`}>
          <select>
            <option value="">지급</option>
            <option value="">미지급</option>
          </select>
        </div>
      </section>
    </div>
  )
}

export default UserComplexFirst
