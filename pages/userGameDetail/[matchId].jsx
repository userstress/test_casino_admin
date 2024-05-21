import React, { useEffect } from "react"
import ComplexList from "@components/cumstomDetailList/ComplexList"
import Layout from "@components/Layout"
import { useRouter } from "next/router"
// 내역
export default function matchId() {
  const router = useRouter()

  useEffect(() => {}, [router.isReady])
  if (router.isReady) {
    return <ComplexList matchId={router.query.matchId} />
  }
  return null
}
