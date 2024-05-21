/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
import axios from "axios"

const callAxios = axios.create({
  baseURL: "https://kplayone.com",
  headers: {
    "Content-Type": "application/json",
    "ag-code": process.env.NEXT_PUBLIC_AG_CODE,
    "ag-token": process.env.NEXT_PUBLIC_AG_TOKEN,
  },
})

export default async function handler(req, res) {
  // "ag-code": "QWE0000",
  // "ag-token": "DdM6BTnW3BuhzaCiELH5hkz951Bw1xXP",
  if (req.method === "POST") {
    try {
      const response = await callAxios.get(`/results/${req.body.prd_id}/${req.body.txnId}`)
      res.status(200).json({ data: response.data })
    } catch (error) {
      res.status(500).json({ error: "Server error" })
    }
  } else {
    res.status(405).end() // Method Not Allowed
  }
}
