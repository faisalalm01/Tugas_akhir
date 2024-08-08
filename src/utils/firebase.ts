import messaging from '@react-native-firebase/messaging';

// Permintaan izin notifikasi
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

// Mendapatkan token perangkat
async function getFcmToken() {
  const token = await messaging().getToken();
  console.log('FCM Token:', token);
  // Kirim token ke server backend Anda
}

// Mengatur listener notifikasi
function setupNotificationListeners() {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', remoteMessage);
  });
}

export {requestUserPermission, getFcmToken, setupNotificationListeners};
