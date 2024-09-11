import { useEffect } from 'react';

export const useNotificationPermission = () => {
  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Unable to get permission to notify.');
        }
      } catch (error) {
        console.error('Error requesting notification permission:', error);
      }
    };

    requestNotificationPermission();
  }, []);
};
