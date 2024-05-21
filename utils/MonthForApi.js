export default function parseDateString(dateStr) {
  // Splitting the date string by '-'
  const parts = dateStr.split("-")

  // Extracting year and month and converting them to numbers
  const year = parseInt(parts[0], 10)
  const month = parseInt(parts[1], 10)

  // Returning the result as an object
  return { year, month }
}
