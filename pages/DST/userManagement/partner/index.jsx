import DSTLayout from "@components/DSTC/DSTLayout/DSTLayout"
import React from "react"

function index() {
  return <div>index</div>
}

export default index

// index 페이지에서 getLayout설정을 해줘야 layout이 표시됨
// 에러페이지 등 잘못된 접근 페이지 layout 다르게 사용하기 위함
index.getLayout = function getLayout(page) {
  return <DSTLayout>{page}</DSTLayout>
}
