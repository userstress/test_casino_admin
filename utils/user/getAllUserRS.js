import { create } from "zustand"
import { getCookie } from "cookies-next"
import axios from "axios"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL

export const getAllUserRS = create((set) => ({
  allRechargedList: [],
  allWaitingRS: [],
  allUnreadRS: [],
  allRechargedAmount: 0,
  getAllRechargedList: async (startDate, endDate) => {
    // 입금신청 완료상태
    const response = await axios.get(
      `${basicURL}/api/v2/managers/rt/created?startDate=${startDate}&endDate=${endDate}`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${tokens}`,
        },
      },
    )
    const data = await response.data
    const temp = data.reduce((total, obj) => {
      return total + obj.rechargeAmount
    }, 0)
    set({ allRechargedList: data })
    set({ allRechargedAmount: temp })
  },
  getAllWaitingList: async (startDate, endDate) => {
    // 입금신청 대기상태
    const response = await axios.get(
      `${basicURL}/api/v2/managers/rt/created?startDate=${startDate}&endDate=${endDate}&status=WAITING`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${tokens}`,
        },
      },
    )
    const data = await response.data
    set({ allWaitingRS: data })
  },
  getAllUnreadList: async (startDate, endDate) => {
    // 입금신청 안읽음 상태
    const response = await axios.get(
      `${basicURL}/api/v2/managers/rt/created?startDate=${startDate}&endDate=${endDate}&status=UNREAD`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${tokens}`,
        },
      },
    )
    const data = await response.data
    set({ allUnreadRS: data })
  },
}))
