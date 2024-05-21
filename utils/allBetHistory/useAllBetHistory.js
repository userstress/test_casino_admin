import { create } from "zustand"
import { getCookie } from "cookies-next"
import axios from "axios"
import { toast } from "react-toastify"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL
const headers = {
  accept: "application/json",
  Authorization: `${tokens}`,
  "Content-Type": "application/json",
}

export const useAllBetHistory = create((set) => ({
  allBetHistory: [],
  getAllBetHistory: async (betGroupId) => {
    const response = await axios.get(`${basicURL}/api/v2/managers/total-bets/${betGroupId}/details`, {
      headers: headers,
    })
    const data = await response.data
    const updatedData = data.map((item, index) => ({
      ...item,
      id: index + 1,
    }))
    set({ allBetHistory: updatedData })
  },
}))
