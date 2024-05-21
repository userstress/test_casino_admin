/* eslint-disable */
import { persist } from "zustand/middleware"
import { create } from "zustand"

export const useDifferStastic = create(
  persist(
    (set) => ({
      date: "",
      getdateData: async (dates) => {
        set({ date: dates })
      },
      reSetDates: async () => {
        set({ date: "" })
      },
    }),
    {
      name: "useDifferStastic-storage", // 저장할 이름
      getStorage: () => sessionStorage, // 저장에 사용할 스토리지
    },
  ),
)
