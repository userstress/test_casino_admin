/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import axios from "axios"

const callAxios = axios.create({
  baseURL: "https://kplayone.com",
  headers: {
    "Content-Type": "application/json",
    "ag-code": process.env.NEXT_PUBLIC_AG_CODE_PRODUCTION,
    "ag-token": process.env.NEXT_PUBLIC_AG_TOKEN_PRODUCTION,
  },
})

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await callAxios.post(`/betresults`, req.body)
      res.status(200).json({ data: response.data })
    } catch (error) {
      res.status(500).json({ error: "Server error" })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
