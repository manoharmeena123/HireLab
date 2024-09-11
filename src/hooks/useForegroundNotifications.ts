import { useEffect } from 'react';
import { onForegroundMessage } from '@/app/notifications/firebaseConfig'; // Adjust the path to your firebaseConfig
import { toast } from 'react-toastify';

export const useForegroundNotifications = () => {
  useEffect(() => {
    onForegroundMessage()
      .then((payload) => {
        if (payload?.notification) {
          const { title, body } = payload.notification;
          console.log('title', title,body)
          toast.info(`${title}: ${body}`, {
            position: 'top-right',
            autoClose: 5000,
          });
        }
      })
      .catch((error) => console.error('Error receiving notification: ', error));
  }, []);
};
