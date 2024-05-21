function dateSortComparator(v1, v2) {
  // 'YYYY-MM-DDTHH:mm:ss' 형식의 문자열을 'YYYY/MM/DD HH:mm' 형식으로 변환
  const formatDateTime = (datetime) => {
    const parts = datetime.split("T")
    const datePart = parts[0]
    const timePart = parts[1].substring(0, 5)
    return `${datePart} ${timePart}`
  }

  const date1 = new Date(formatDateTime(v1))
  const date2 = new Date(formatDateTime(v2))

  return date1 - date2
}

export default dateSortComparator
