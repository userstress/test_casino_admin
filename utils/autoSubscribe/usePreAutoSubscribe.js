// 프리매치 리그 자동 구독 목록

import { create } from "zustand"
import { getCookie } from "cookies-next"
import axios from "axios"
import i18n from "@utils/locale/i18n"
import { toast } from "react-toastify"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL
const LSPORTS_URL = process.env.NEXT_PUBLIC_LSPORTS_URL
const LSPORTS_USERNAME = process.env.NEXT_PUBLIC_LSPORTS_USERNAME
const LSPORTS_PASSWORD = process.env.NEXT_PUBLIC_LSPORTS_PASSWORD
const headers = {
  accept: "application/json",
  Authorization: `${tokens}`,
  "Content-Type": "application/json",
}

export const usePreAutoSubscribe = create((set) => ({
  preAutoSubscribeList: [],
  getPreAutoSubscribe: async () => {
    const response = await axios.get(`${basicURL}/pre/subscribes`, { headers: headers })
    const data = await response.data.data
    data.map((item) => {
      // 응답 객체 수정
      item.leagueNameKOR = i18n.t(item.name)
      item.locationName = i18n.t(item.locationName)
      item.sportName = i18n.t(item.sportName)
    })
    set({ preAutoSubscribeList: data })
  },
}))
