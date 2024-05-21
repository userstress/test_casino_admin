const rendercellCopy = () => (params) => {
  const handleClick = (event) => {
    event.preventDefault()
    console.log(`Cell clicked: ${params.value}`)
    return window.navigator.clipboard.writeText(params.value)
  }

  return (
    <div onDoubleClick={handleClick} style={{ cursor: "pointer" }}>
      {params.value}
    </div>
  )
}

export default rendercellCopy
