export default function ParsNumPrice(input) {
  // Check if the input is a number or can be converted to a number
  const num = Number(input)
  if (isNaN(num)) {
    return NaN // or you could return "NaN" if you want the return type to always be string
  }

  // Format to two decimal places as a string
  return num.toFixed(2)
}
