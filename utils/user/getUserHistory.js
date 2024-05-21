import axios from "axios"
import { create } from "zustand"
import { getCookie } from "cookies-next"
import handleApiError from "@utils/REST/serviceLayer/handleApiError"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL

export const getUserHistory = create((set) => ({
  LoginTryList: [], // ROLE_GUEST인 사용자들
  callUserList: async (startDate, endDate) => {
    try {
      const response = await axios.get(`${basicURL}/api/v2/history/range?startDate=${startDate}&endDate=${endDate}`, {
        headers: {
          Authorization: `${tokens}`,
        },
      })
      const data = await response.data.data

      set({ LoginTryList: data })
    } catch (error) {
      handleApiError(error)
    }
  },
}))
