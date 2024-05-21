import axios from "axios"
import { create } from "zustand"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export const getBetList = create((set) => ({
  resultsData: [],
  callBetList: async (type, page, size) => {
    const response = await axios.get(`${basicURL}/debits?type=${type}&page=${page}&size=${size}`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    const data = await response.data.data
    set({ resultsData: data })
  },
}))
