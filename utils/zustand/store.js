import { create } from "zustand"
import { persist } from "zustand/middleware"

const useStore = create(
  persist(
    (set) => ({
      ids: "",
      getUserIds: (newIds) =>
        set((state) => ({
          ids: newIds,
        })),
      resetIds: () => set((state) => ({ ids: "" })),
    }),
    {
      name: "note-slice-storage", // 스토어의 상태를 저장할 때 사용할 키
      // getStorage: () => localStorage, // localStorage 사용
    },
  ),
)

export default useStore
