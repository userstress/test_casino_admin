import create from "zustand"
import { devtools, persist } from "zustand/middleware"
import { produce } from "immer"

// 스토어를 생성하는 함수
export const useCheckboxStore = create(
  persist(
    devtools((set) => ({
      // 초기 상태
      checkboxes: [],

      // 체크박스 상태를 업데이트하는 함수
      toggleCheckbox: (value) =>
        set(
          produce((state) => {
            const index = state.checkboxes.indexOf(value)
            if (index > -1) {
              // 이미 선택된 경우, 제거
              state.checkboxes.splice(index, 1)
            } else {
              // 선택되지 않은 경우, 추가
              state.checkboxes.push(value)
            }
          }),
        ),

      // 모든 체크박스 선택을 취소하는 함수
      clearCheckboxes: () => set({ checkboxes: [] }),
    })),
    {
      name: "checkboxStore", // storage 내의 항목 이름
      getStorage: () => sessionStorage, // 저장소로 sessionStorage 사용
    },
  ),
)
