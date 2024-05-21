import axios from "axios"
import { create } from "zustand"

export const getResults = create((set) => ({
  resultsData: [],
  callUnmatchedResultData: async () => {
    const response = await axios.get(`/debitResults`, {
      // headers: {
      //   Authorization: `Bearer ${token}`,
      // },
    })
    const data = await response.data
    set({ resultsData: data })
  },
}))
