/* eslint-disable */
import { persist } from "zustand/middleware"
import { create } from "zustand"

export const useUserDetailStore = create(
  persist(
    (set) => ({
      userDetail: null,
      getUserData: async (url, reqOption) => {
        try {
          const response = await fetch(url, reqOption)
          const dataJSON = await response.json()
          set({ userDetail: dataJSON })
          return dataJSON
        } catch (error) {
          console.error("", error)
        }
      },
      removeUserData: () => {
        set({ userDetail: null })
      },
    }),
    {
      name: "userDetail-storage", // 저장할 이름
      getStorage: () => sessionStorage, // 저장에 사용할 스토리지
    },
  ),
)
