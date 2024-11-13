// "use client";

// import { initializeApp } from "firebase/app";
// import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
// import { getMessaging, getToken, onMessage } from "firebase/messaging";

// // Firebase configuration (ensure you replace with your own keys)
// const firebaseConfig = {
//   apiKey: `AIzaSyAikKUKM6xBwAuaCFmJSv_ChhWkBUCzClY`,
//   authDomain: `hirelab-push-notification.firebaseapp.com`,
//   projectId: `hirelab-push-notification`,
//   storageBucket: `hirelab-push-notification.appspot.com`,
//   messagingSenderId: `987031827435`,
//   appId: `1:987031827435:web:205e2afacbaf6a099bdfae`,
// };

// // Initialize Firebase
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getFirestore(firebaseApp);

// // Initialize Firebase Messaging (only in the browser)
// let messaging: ReturnType<typeof getMessaging> | null = null;

// if (typeof window !== "undefined" && "serviceWorker" in navigator) {
//   try {
//     // Register the service worker if not already registered
//     navigator.serviceWorker.register('/firebase-messaging-sw.js').then((registration) => {
//       console.log("Service Worker registered with scope:", registration.scope);
//     });

//     // Initialize Firebase Messaging
//     messaging = getMessaging(firebaseApp);
//   } catch (error) {
//     console.error("Error initializing Firebase Messaging", error);
//   }
// }

// // Function to get Firebase Cloud Messaging token (client-side only)
// export const getFirebaseToken = async (): Promise<string | null> => {
//   if (!messaging) {
//     console.warn("Firebase Messaging is not available in this environment");
//     return null;
//   }

//   try {
//     const token = await getToken(messaging, { vapidKey: "BEsxReWpk85bYQeQydVcWxggwcOb9aiZUqo2GFSxMcIGQKHHLnBJNnCP45J1YasyD6o49DV7TpOKk2z0ZoT44_8" });
//     console.log("Firebase token:", token);
//     return token;
//   } catch (error) {
//     console.error("Error getting Firebase token", error);
//     return null;
//   }
// };

// // Function to handle foreground messages (client-side only)
// export const onForegroundMessage = (): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     if (!messaging) {
//       reject("Firebase Messaging is not available in this environment");
//     } else {
//       onMessage(messaging, (payload) => {
//         resolve(payload);
//       });
//     }
//   });
// };

// // Firestore functions to save and fetch notifications
// export const addNotificationToFirestore = async (title: string, message: string) => {
//   try {
//     const docRef = await addDoc(collection(db, "notifications"), {
//       title,
//       message,
//       timestamp: new Date(),
//     });
//     console.log("Notification added with ID: ", docRef.id);
//   } catch (e) {
//     console.error("Error adding notification: ", e);
//   }
// };

// export const fetchNotificationsFromFirestore = async () => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "notifications"));
//     return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//   } catch (error) {
//     console.error("Error fetching notifications from Firestore:", error);
//     return [];
//   }
// };
