// 2. 흐르는 공지

import CustomHeader from "@components/customHeader/CustomHeader"
import axios from "axios"
import { useEffect, useState } from "react"
import styles from "./InputDistributer.module.css"
import CustomDistributerSignin from "@components/customDistributerSignin/CustomDistributerSignin"
const rows = []

export default function InputDistributer() {
  return (
    <>
      <CustomHeader
        text={
          <div>
            정산관리&nbsp;{" "}
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="13" viewBox="0 0 10 13" fill="none">
              <path d="M10 6.5L0.25 12.1292L0.25 0.870835L10 6.5Z" fill="white" />
            </svg>{" "}
            &nbsp;입금 상세 정보
          </div>
        }
        customStyle={{ height: "1.979vw", width: "100%", background: "black" }}
      />

      <div>
        <CustomDistributerSignin />
      </div>
    </>
  )
}
