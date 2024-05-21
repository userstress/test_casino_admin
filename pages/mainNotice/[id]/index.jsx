import Layout from "@components/Layout"
import { useRouter } from "next/router"
import React, { useEffect, useRef, useState } from "react"
import styles from "./index.module.css"
import CustomButton from "@components/customButton/CustomButton"
import CustomEditor from "@components/customEditor/CustomEditor"

export default function index() {
  const router = useRouter()

  return (
    <div className={styles.noticeDetailTableWrapper}>
      <table className={styles.noticeDetailTable}>
        <colgroup>
          <col width={420}></col>
          <col width={580}></col>
          <col width={250}></col>
          <col width={414}></col>
        </colgroup>

        <thead>
          <tr>
            <th className={styles.title}>메인 공지</th>
            <th colSpan={3}></th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>게시타입</td>
            <td>
              <select style={{ width: "40%" }}>
                <option>공지사항</option>
              </select>
              <select style={{ width: "30%" }}>
                <option>노출</option>
              </select>
              <select style={{ width: "30%" }}>
                <option>댓글허용</option>
              </select>
            </td>
            <td>작성자(닉네임)</td>
            <td>
              <input type="text" placeholder="관리자" value={"관리자"} readOnly />
            </td>
          </tr>
          <tr>
            <td>글제목</td>
            <td colSpan={3}>
              <input type="text" placeholder="글제목" value={"글제목"} readOnly />
            </td>
          </tr>
          <tr style={{ height: "200px" }}>
            <td>글내용</td>
            <td colSpan={3}>
              <CustomEditor
                wrapperStyle={{ height: "200px", backgroundColor: "#181D4B" }}
                editorStyle={{ height: "158px", border: "1px solid white" }}
                toolbarStyle={{ marginBottom: "0px", backgroundColor: "#181D4B", color: "black" }}
              />
            </td>
          </tr>
          <tr>
            <td>등록일자</td>
            <td>
              <input type="text" placeholder="2023-10-01 12:32:24" value={"2023-10-01 12:32:24"} readOnly />
            </td>
            <td>조회</td>
            <td>
              <input type="text" placeholder="24" value={24} readOnly />
            </td>
          </tr>
        </tbody>
      </table>

      <div className={styles.btnWrapper}>
        <CustomButton
          customStyle={{
            width: "120px",
            height: "22px",
            backgroundColor: "#696969",
            color: "white",
            marginRight: "3px",
          }}
          text={"수정하기"}
        />
        <CustomButton
          customStyle={{
            width: "120px",
            height: "22px",
            backgroundColor: "#696969",
            color: "white",
            marginRight: "3px",
          }}
          text={"삭제하기"}
        />
        <CustomButton
          customStyle={{ width: "120px", height: "22px", backgroundColor: "#696969", color: "white" }}
          text={"목록으로"}
        />
      </div>

      <table className={styles.noticeDetailTable}>
        <colgroup>
          <col width={420}></col>
          <col width={580}></col>
          <col width={250}></col>
          <col width={414}></col>
        </colgroup>

        <tbody>
          <tr>
            <td>댓글작성자</td>
            <td>
              <input type="text" placeholder="" value={""} readOnly />
            </td>
            <td>댓글작성일</td>
            <td>
              <input type="text" placeholder="" value={"2023-10-01 19:21:16"} readOnly />
            </td>
          </tr>
          <tr>
            <td>댓글내용</td>
            <td colSpan={3}>
              <input type="text" placeholder="" value={""} readOnly />
            </td>
          </tr>
        </tbody>
      </table>
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
          <CustomButton
            customStyle={{
              width: "150px",
              height: "30px",
              backgroundColor: "#0000FF",
              color: "white",
              borderRadius: "5px",
            }}
            text={"저장하기"}
          />
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
