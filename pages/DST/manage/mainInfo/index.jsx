import React from "react"
import MainInfoTop from "./component/MainInfoTop"
import DSTLayout from "../../../../components/DSTC/DSTLayout/DSTLayout"
import MainInfoTable from "./component/MainInfoTable"

function index() {
  return (
    <DSTLayout>
      <MainInfoTop />
      <MainInfoTable />
    </DSTLayout>
  )
}

export default index
