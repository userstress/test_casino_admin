export default function SwitchOrderStatus(orderStatus) {
  switch (orderStatus) {
    case "CANCEL_HIT":
      return "적특"
    case "CANCEL":
      return "베팅 취소(유저)"
    case "WAITING":
      return "대기"
    case "HIT":
      return "당첨"
    case "FAIL":
      return "낙첨"
    default:
      return "대기"
  }
}
