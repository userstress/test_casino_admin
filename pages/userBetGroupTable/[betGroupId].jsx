import React, { useEffect } from "react"
import Betgrouptable from "@components/cumstomDetailList/betGroup_Table/Betgrouptable"
import Layout from "@components/Layout"
import { useRouter } from "next/router"

export default function betGroupId() {
  const router = useRouter()

  useEffect(() => {}, [router.isReady])
  if (router.isReady) {
    return <Betgrouptable betGroupId={router.query.betGroupId} />
  }
  return null
}
