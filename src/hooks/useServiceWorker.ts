// import { useEffect } from "react";

// // Custom hook to register the service worker
// export const useServiceWorker = () => {
//   useEffect(() => {
//     if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//       navigator.serviceWorker
//         .register("http://localhost:3000/firebase-messaging-sw.js") // Ensure this is in /public
//         .then((registration) => {
//           console.log("Service Worker registered with scope:", registration.scope);
//         })
//         .catch((error) => {
//           console.error("Service Worker registration failed:", error);
//         });
//     }
//   }, []);
// };
