// public/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyAikKUKM6xBwAuaCFmJSv_ChhWkBUCzClY",
  authDomain: "hirelab-push-notification.firebaseapp.com",
  projectId: "hirelab-push-notification",
  storageBucket: "hirelab-push-notification.appspot.com",
  messagingSenderId: "987031827435",
  appId: "1:987031827435:web:205e2afacbaf6a099bdfae",
};

// Initialize Firebase in the service worker
firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging object
const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);

  // Customize your notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
