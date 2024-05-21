import { getCookie } from "cookies-next"
import { toast } from "react-toastify"

export async function fetchOrders({ queryKey }) {
  const [key, { isAll, pages, datepick, orderStatus, matchStatus, customSet, inputKeyword }] = queryKey
  const today = new Date()
  const formattedDate = today.toISOString().split("T")[0]

  // console.log(previousIsAll)
  // console.log(isAll)

  const urlParams = new URLSearchParams({
    page: pages === 0 ? 1 : pages,
    size: 20,
    startDate: isAll ? "2024-03-01" : datepick.start,
    endDate: isAll ? formattedDate : datepick.start,
  })

  // if (orderStatus) {
  //   urlParams.append("orderResult", orderStatus)
  // }
  if (matchStatus) {
    urlParams.append("custom", matchStatus)
  }

  if (customSet !== "" && inputKeyword !== "") {
    urlParams.append(customSet, inputKeyword)
  } else if (customSet === "" && inputKeyword !== "") {
    // customSet이 비어있고 inputKeyword가 비어있지 않을 경우
    toast("검색 조건을 전체가 아닌 다른 값으로 설정해주세요.", { type: "warning" })
  }

  const headers = {
    "Content-Type": "application/json",
    Authorization: getCookie("token"),
  }

  const response = await fetch(`https://dailymodelapp.com/api/v2/users/orderHistory/get?${urlParams.toString()}`, {
    headers,
  })
  if (!response.ok) {
    if (response.status === 403) {
      // 클라이언트 사이드에서의 리디렉션 처리
      toast.error("로그아웃 되었습니다")
      return window.location.assign("/")
    }
    return toast.error("서버 응답이 없습니다")
  }
  const responseData = await response.json()
  return responseData // 이후 데이터 처리는 useQuery의 onSuccess에서 합니다.
}
