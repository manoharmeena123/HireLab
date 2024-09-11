importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging.js');

const firebaseConfig = {
  apiKey: `AIzaSyAikKUKM6xBwAuaCFmJSv_ChhWkBUCzClY`,
  authDomain:`hirelab-push-notification.firebaseapp.com`,
  projectId: `hirelab-push-notification`,
  storageBucket:`hirelab-push-notification.appspot.com`,
  messagingSenderId:`987031827435`,
  appId:`1:987031827435:web:205e2afacbaf6a099bdfae`
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
