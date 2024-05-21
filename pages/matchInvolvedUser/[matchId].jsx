import React from "react"
import InvolvedList from "@components/cumstomDetailList/match_involved/InvolvedList"

// 내역
export default function userId() {
  const sss = [{ id: 1 }, { id: 2 }, { id: 5 }, { id: 4 }]

  return <InvolvedList rowArray={sss} />
}
