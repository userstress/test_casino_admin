import { create } from "zustand"
import { getCookie } from "cookies-next"
import axios from "axios"
import { toast } from "react-toastify"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL

export const getAllMoneyLog = create((set) => ({
  allMoneyLogList: [],
  getAllMoneyLogList: async (startDate, endDate) => {
    try {
      const response = await axios.get(
        `${basicURL}/api/v2/admins/lv/calculate?startDate=${startDate}&endDate=${endDate}`,
        {
          headers: {
            accept: "application/json",
            Authorization: `${tokens}`,
          },
        },
      )
      const data = await response.data
      set({ allMoneyLogList: data })
    } catch (error) {
      console.error("Error fetching money logs:", error)
      // toast.error("오늘 입금액을 불러올수없습니다")
    }
  },
}))
