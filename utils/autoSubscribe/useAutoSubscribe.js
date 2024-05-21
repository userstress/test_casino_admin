// 인플레이 리그 자동 구독 목록

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

export const useAutoSubscribe = create((set) => ({
  autoSubscribeList: [],
  getAutoSubscribe: async () => {
    const response = await axios.get(`${basicURL}/subscribes`, { headers: headers })
    const data = await response.data.data
    data.map((item) => {
      // 응답 객체 수정
      item.leagueNameKOR = i18n.t(item.name)
      item.locationName = i18n.t(item.locationName)
      item.sportName = i18n.t(item.sportName)
    })
    set({ autoSubscribeList: data })
  },

  patchAutoSubscribe: async (params) => {
    try {
      // 우리서버로 요청
      const patchRequestBody = {
        leagueId: params.leagueId,
        sportId: params.sportId,
        locationId: params.locationId,
        subscribeStatus: params.subscribeStatus,
      }

      // lsports로 요청
      const postRequestBody = {
        PackageId: 1866, // 인플레이 아이디
        UserName: LSPORTS_USERNAME,
        Password: LSPORTS_PASSWORD,
        Subscriptions: [{ SportsId: params.sportId, LoctaionId: params.locationId, LeagueId: params.leagueId }],
      }
      // 우리서버로 보내는거 (구독,비구독 둘다)
      const patchRequest = axios.patch(`${basicURL}/unsubscribe`, patchRequestBody, { headers: headers })

      // lsports 구독 요청과 구독 취소요청 구분 위함
      if (params.subscribeStatus === "구독 중") {
        const unSubscribeRequset = axios.post(`${LSPORTS_URL}/Leagues/Unsubscribe`, postRequestBody)
        await Promise.all([patchRequest, unSubscribeRequset])
      } else {
        const subscribeRequset = axios.post(`${LSPORTS_URL}/Leagues/Subscribe`, postRequestBody)
        await Promise.all([patchRequest, subscribeRequset])
      }
      toast.success("요청을 성공적으로 처리하였습니다.")
    } catch (error) {
      toast.error("요청을 보내는데 실패하였습니다.")
    }
  },
}))
