// pages/_error.js

import ErrorPage from "next/error"
import React from "react"

const CustomErrorPage = ({ statusCode }) => {
  // 에러 페이지에만 커스텀 레이아웃을 적용하려면 여기에서 레이아웃을 사용하지 않고 에러 페이지만 표시합니다.
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Error {statusCode}</h1>
      <p>잘못된 접근입니다!!</p>
    </div>
  )
}

// getInitialProps를 사용하여 에러 상태 코드를 가져옵니다.
CustomErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default CustomErrorPage
