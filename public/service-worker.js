// public/service-worker.js
self.addEventListener("push", function (event) {
  const data = event.data.json() // JSON 데이터를 받는 경우
  const { title, message, icon } = data

  const options = {
    body: message,
    icon: icon || "./sounds.png", // 알림에 표시할 아이콘
    // 필요한 추가 옵션들
  }

  event.waitUntil(self.registration.showNotification(title, options))
})
