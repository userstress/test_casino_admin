import { create } from "zustand"
import { getCookie } from "cookies-next"
import axios from "axios"

const basicURL = process.env.NEXT_PUBLIC_API_URL
const tokens = getCookie("token")

export const getAllExchangeReq = create((set) => ({
  allExchangedList: [],
  allUnreadExchangeReqList: [],
  allWaitingExchangeReqList: [],
  allWaitingExchangeReq: [],
  allExchangedAmount: 0,

  getAllExchangedList: async (startDate, endDate) => {
    const response = await axios.get(`${basicURL}/api/v2/managers/es?startDate=${startDate}&endDate=${endDate}`, {
      headers: {
        accept: "application/json",
        Authorization: `${tokens}`,
      },
    })
    const data = await response.data.data

    const temp = data.reduce((total, obj) => {
      return total + obj.exchangeAmount
    }, 0)

    set({ allExchangedList: data })
    set({ allExchangedAmount: temp })
  },
  getAllUnreadExchangeReq: async (startDate, endDate) => {
    // 안읽은 상태의 환전신청 리스트 가져옴
    const response = await axios.get(
      `${basicURL}/api/v2/managers/et/created?startDate=${startDate}&endDate=${endDate}&status=UNREAD`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${tokens}`,
        },
      },
    )
    const data = await response.data
    set({ allUnreadExchangeReqList: data })
  },
  getAllWaitingExchangeReq: async (startDate, endDate) => {
    // 대기 상태의 환전신청 리스트 가져옴
    const response = await axios.get(
      `${basicURL}/api/v2/managers/et/created?startDate=${startDate}&endDate=${endDate}&status=WAITING`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${tokens}`,
        },
      },
    )
    const data = await response.data
    set({ allWaitingExchangeReqList: data })
  },
  getAllSTATUSExchangeReq: async (startDate, endDate) => {
    // 모든 상태의 환전신청 리스트 가져옴
    const response = await axios.get(
      `${basicURL}/api/v2/managers/et/created?startDate=${startDate}&endDate=${endDate}&status=WAITING`,
      {
        headers: {
          accept: "application/json",
          Authorization: `${tokens}`,
        },
      },
    )
    const data = await response.data
    set({ allWaitingExchangeReqList: data })
  },
}))
