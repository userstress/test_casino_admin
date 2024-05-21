import axios from "axios"
import { toast } from "react-toastify"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export const moneyLogStore = create(
  persist(
    (set, get) => ({
      // 초기 상태
      userIds: 0,
      setUserId: (val) => set({ userIds: val }),
    }),
    {
      name: "moneyLogStore", // storage 내의 항목 이름 (고유해야 함)
      storage: createJSONStorage(() => sessionStorage), // (선택사항) 기본값으로 'localStorage'가 사용됨
    },
  ),
)
