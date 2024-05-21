// pushNotificationSetup.js
export function setupPushNotification() {
  const key = process.env.NEXT_PUBLIC_VAPID_KEY
  console.log(key)
  if ("serviceWorker" in navigator && "PushManager" in window) {
    console.log("Service Worker and Push is supported")

    navigator.serviceWorker
      .register("/service-worker.js")
      .then(function (swReg) {
        console.log("Service Worker is registered", swReg)

        swReg.pushManager
          .getSubscription()
          .then(function (subscription) {
            if (subscription === null) {
              console.log("User is not subscribed.")

              return swReg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(key),
              })
            } else {
              console.log("User is already subscribed.")
              // Optional: Update subscription on your server
            }
          })
          .then(function (subscription) {
            if (subscription) {
              console.log("User is subscribed:", subscription)
              // Optional: Send subscription to your server
            }
          })
          .catch(function (error) {
            if (Notification.permission === "denied") {
              console.warn("Permission for notifications was denied")
            } else {
              console.error("Failed to subscribe the user: ", error)
            }
          })
      })
      .catch(function (error) {
        console.error("Service Worker registration failed: ", error)
      })
  } else {
    console.warn("Push messaging is not supported")
  }
}

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}
