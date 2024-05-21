import React, { useEffect } from "react"
import UserDetailComplexList from "@components/cumstomDetailList/UserDetailComplexList"
import Layout from "@components/Layout"
import { useRouter } from "next/router"
// 내역
export default function userId() {
  const router = useRouter()

  useEffect(() => {}, [router.isReady])
  if (router.isReady) {
    return <UserDetailComplexList userId={router.query.userId} />
  }
  return null
}
