import { create } from "zustand"
import { getCookie } from "cookies-next"
import axios from "axios"
import { toast } from "react-toastify"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL
const headers = {
  accept: "application/json",
  Authorization: `${tokens}`,
  "Content-Type": "application/json",
}

export const useLoginInquiryAPI = create((set) => ({
  loginInquiryList: [],
  getLoginInquiryList: async () => {
    const response = await axios.get(`${basicURL}/api/v2/managers`, {
      headers: headers,
    })
    const data = await response.data
    set({ loginInquiryList: data })
  },
  patchLoginInquiryList: async (inquiryId, inputValue) => {
    await axios
      .put(`${basicURL}/api/v2/managers/${inquiryId}/update`, inputValue, { headers: headers })
      .then((response) => {
        toast.success("메모가 성공적으로 등록되었습니다.")
      })
      .catch((error) => {
        toast.error("메모등록에 실패하였습니다.")
      })
  },
}))
