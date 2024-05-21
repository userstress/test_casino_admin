import { create } from "zustand"
import { getCookie } from "cookies-next"
import axios from "axios"
import i18n from "@utils/locale/i18n"
import { toast } from "react-toastify"

const tokens = getCookie("token")
const basicURL = process.env.NEXT_PUBLIC_API_URL
const LSPORTS_URL = process.env.NEXT_PUBLIC_LSPORTS_URL
const LSPORTS_USERNAME = process.env.NEXT_PUBLIC_LSPORTS_USERNAME
const LSPORTS_PASSWORD = process.env.NEXT_PUBLIC_LSPORTS_PASSWORD
const headers = {
  accept: "application/json",
  Authorization: `${tokens}`,
  "Content-Type": "application/json",
}


export const usePremarketInfo=create((set)=>({
    premarketInfoList:[],
    getPremarketInfo:async()=>{
        // const response
    }
}))