import axios from "axios"
import { create } from "zustand"
import { getCookie } from "cookies-next"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL

export const getUserList = create((set) => ({
  userList: [],
  pendingUserList: [], //role이 GUEST인 친구들
  callUserList: async () => {
    const response = await axios.get(`${basicURL}/api/v2/managers/users`, {
      headers: {
        Authorization: `${tokens}`,
      },
    })
    const data = await response.data
    data.map((item) => {
      item.balance = item?.wallet?.balance
      item.point = item?.wallet?.point
      item.id = Number(item.id)
    })
    const temp = data.filter((item) => item.role === "ROLE_GUEST")
    set({ userList: data })
    set({ pendingUserList: temp })
  },
}))
