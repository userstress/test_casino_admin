import * as React from "react"
import Box from "@mui/material/Box"
import Rating from "@mui/material/Rating"
import { Input } from "@mui/material"

export function MoneyInput(props) {
  const { item, applyValue, focusElementRef } = props

  // Use useRef to create a reference to the Input component
  const inputRef = React.useRef(null)

  // Use useImperativeHandle to expose a focus method
  React.useImperativeHandle(focusElementRef, () => ({
    focus: () => {
      // Directly focus the Input component using the ref
      if (inputRef.current) {
        inputRef.current.focus()
      }
    },
  }))

  const handleFilterChange = (event) => {
    applyValue({ ...item, value: event.target.value })
  }

  return (
    <Box
      sx={{
        display: "inline-flex",
        flexDirection: "row",
        alignItems: "center",
        height: 48,
        pl: "20px",
      }}
    >
      <input
        type="text" // Change type to text
        onChange={handleFilterChange}
        ref={inputRef}
        value={item.value} // Use the value as a string
        inputMode="numeric" // Optional: to bring up the numeric keypad on mobile devices
      />
    </Box>
  )
}

export const NumberCount = [
  {
    label: "이상",
    value: "above",
    getApplyFilterFn: (filterItem) => {
      if (!filterItem.field || !filterItem.value || !filterItem.operator) {
        return null
      }

      return (params) => {
        return Number(params.value) >= Number(filterItem.value)
      }
    },
    InputComponent: MoneyInput,
    InputComponentProps: { type: "number" },
    getValueAsString: (value) => `${value}`,
  },
]
