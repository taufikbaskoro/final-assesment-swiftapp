import messaging from '@react-native-firebase/messaging';
import {useEffect, useState} from 'react';

export const usePushNotification = () => {
  const [notificationData, setNotificationData] = useState(null);

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    // console.log('Message handled in the background!', remoteMessage);
  });

  messaging().onNotificationOpenedApp(async remoteMessage => {
    setNotificationData(remoteMessage);
  });

  const getFcmToken = async () => {
    const fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log(fcmToken);
    } else {
      // console.log('Failed', 'No token received');
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFcmToken(); //<---- Add this
    }
  };

  useEffect(() => {
    requestUserPermission();

    messaging().subscribeToTopic('notifications');
    // .then(() => console.log('Subscribed to topic! notifications'));

    const unsubscribe = messaging().onMessage(async remoteMessage => {
      setNotificationData(remoteMessage);
    });
    return unsubscribe;
  }, []);

  return [notificationData, setNotificationData];
};
