import { apiPaths, appApi } from "./api";

const VAPID_PUBLIC_KEY =
  "BPRxxUqh9B0HkV_nh3jnR0r_EugrOo-yLeZY0iHMhVnXry-rtvDLpxM8tLCYn_g45Z2WqcMk33DFnMt4i-YFe7Q";

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}

export async function subscribeToPush() {
  try {
    if (!("serviceWorker" in navigator))
      return alert("No Service Worker support");

    const registration = await navigator.serviceWorker.register("/sw.js");
    await navigator.serviceWorker.ready;

    const permission = await Notification.requestPermission();
    if (permission !== "granted") return alert("Notifications not allowed");

    let subscription = await registration.pushManager.getSubscription();
    if (!subscription)
      subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });

    await appApi.post(apiPaths.subscribe, subscription);
  } catch (error) {
    throw error;
  }
}
