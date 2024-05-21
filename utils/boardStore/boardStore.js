import axios from "axios"
import { toast } from "react-toastify"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export const boardStore = create(
  persist(
    (set, get) => ({
      // 초기 상태
      boardType: { id: 0, type: "", title: "", content: "" },
      searchModeObj: { type: "", val: "" },
      // isEvent 상태를 업데이트하는 함수
      setIsEvent: (statements) =>
        set({
          isEvent: statements,
        }),
      // 페이지 정보를 업데이트하는 함수
      boardMove: (pageInfo) =>
        set({
          boardType: pageInfo,
        }),
      SearchAway: (val) => set({ searchModeObj: { type: val.type, val: val.value } }),
    }),
    {
      name: "boardStore", // storage 내의 항목 이름 (고유해야 함)
      storage: createJSONStorage(() => sessionStorage), // (선택사항) 기본값으로 'localStorage'가 사용됨
    },
  ),
)
