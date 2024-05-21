import axios from "axios"
import { toast } from "react-toastify"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

const basicURL = process.env.NEXT_PUBLIC_API_URL

export const currentStatusStore = create(
  persist(
    (set, get) => ({
      // 초기 상태
      userIds: 0,
      currentObj: {
        rechargeUnreadCount: 0,
        rechargeWaitingCount: 0,
        rechargeApprovalCount: 0,
        exchangeUnreadCount: 0,
        exchangeWaitingCount: 0,
        exchangeApprovalCount: 0,
        requestAnswerCount: 0,
        waitingAnswerCount: 0,
        userCount: 0,
        guestCount: 0,
        referredByOldGuestUser: "",
        oldestExceedingBetUsername: "",
        oldestMonitoringBetUsername: "",
      },
      setCurrentObj: (val) => set({ currentObj: val }),
    }),
    {
      name: "currentStatusStore",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
)
