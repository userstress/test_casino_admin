import React, { useEffect } from "react"
import ToggleButton from "@mui/material/ToggleButton"
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup"

export default function ToggleButtons({ status, fixtures }) {
  const [alignment, setAlignment] = React.useState(status)
  useEffect(() => {
    setAlignment(status)
  }, [status])

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment)
    }
    const selected = event.target.value
    if (selected === "left") {
      console.log("left")
    }
    if (selected === "right") {
      console.log("right")
    }
  }

  const right = { backgroundColor: "green", color: "white" }
  const left = { backgroundColor: "red", color: "white" }

  const selectedStyle = alignment === "left" ? left : right

  return (
    <ToggleButtonGroup
      value={alignment}
      sx={{
        "& .MuiToggleButton-root": {
          width: "90%",
          "&.Mui-selected": {
            // 선택된 버튼에 대한 스타일을 동적으로 적용합니다.
            ...selectedStyle,
          },
        },
      }}
      exclusive
      onChange={handleChange}
      aria-label="text alignment"
    >
      <ToggleButton
        value="left"
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: alignment === "left" ? "white" : "#FF0000", // 선택되었을 때 흰색, 아닐 때 빨간색
          backgroundColor: alignment === "left" ? "red" : "", // 선택되었을 때 빨간 배경색
          border: "#FF0000",
          padding: "1px",
          margin: "5px",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "orange", // hover 상태일 때의 배경색
          },
        }}
        aria-label="left aligned"
      >
        발매중지
      </ToggleButton>
      <ToggleButton
        value="right"
        sx={{
          fontSize: "12px",
          fontWeight: "bold",
          color: alignment === "right" ? "white" : "#008000", // 선택되었을 때 흰색, 아닐 때 초록색
          backgroundColor: alignment === "right" ? "green" : "", // 선택되었을 때 초록 배경색
          border: "#FF0000",
          padding: "1px",
          margin: "5px",
          borderRadius: "5px",
          "&:hover": {
            backgroundColor: "green", // hover 상태일 때의 배경색
          },
        }}
        aria-label="right aligned"
      >
        발매시작
      </ToggleButton>
    </ToggleButtonGroup>
  )
}
