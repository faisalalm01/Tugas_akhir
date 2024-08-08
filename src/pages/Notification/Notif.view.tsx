// /* eslint-disable @typescript-eslint/no-unused-vars */
// import {FlatList, ScrollView, StyleSheet, Text, View} from 'react-native';
// import React, {useEffect, useState} from 'react';
// import {NavigationProps} from '../../utils/Navigator';

// import {
//   requestUserPermission,
//   getFcmToken,
//   setupNotificationListeners,
// } from '../../utils/firebase';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// type Props = {
//   navigation: NavigationProps;
// };

// // const socket = io('http://localhost:5000');
// interface Detection {
//   id: number;
//   nama: string;
//   ip: string;
//   createdAt: string;
// }

// const Notif: React.FC<Props> = () => {
//   const [detections, setDetections] = useState<Detection[]>([]);

//   useEffect(() => {
//     requestUserPermission();
//     getFcmToken();
//     setupNotificationListeners();

//     // Ambil data deteksi dari API backend
//     fetchDetections();
//   }, []);

//   const fetchDetections = async () => {
//     // const token = 'YOUR_TOKEN_HERE'; // Ganti dengan token yang valid
//     const token = await AsyncStorage.getItem('token');
//     try {
//       const response = await fetch('http://localhost:3000/api/history', {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           'Content-Type': 'application/json',
//         },
//       });
//       const json = await response.json();
//       setDetections(json.data);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const renderItem = ({item}: {item: Detection}) => (
//     <View style={styles.item}>
//       <Text style={styles.title}>{item.nama}</Text>
//       <Text style={styles.detail}>IP: {item.ip}</Text>
//       <Text style={styles.detail}>Waktu: {item.createdAt}</Text>
//     </View>
//   );
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>Deteksi CCTV</Text>
//       <FlatList
//         data={detections}
//         renderItem={renderItem}
//         keyExtractor={item => item.id.toString()}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     paddingTop: 50,
//   },
//   header: {
//     fontSize: 24,
//     textAlign: 'center',
//     marginBottom: 20,
//   },
//   item: {
//     backgroundColor: '#f9c2ff',
//     padding: 20,
//     marginVertical: 8,
//     marginHorizontal: 16,
//   },
//   title: {
//     fontSize: 18,
//   },
//   detail: {
//     fontSize: 14,
//   },
// });

// export default Notif;

import React, {useEffect} from 'react';
import {View, Button, Alert} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import PushNotification from 'react-native-push-notification';

const Notif = () => {
  useEffect(() => {
    // Request permission for notifications
    requestUserPermission();

    // Create notification channels
    createNotificationChannel();

    // Listen to messages in the foreground
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    // Register background handler
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
    });

    // Get FCM token
    messaging()
      .getToken()
      .then(token => {
        console.log('FCM Token:', token);
      });

    // Handle token refresh
    const onTokenRefreshListener = messaging().onTokenRefresh(token => {
      console.log('FCM Token refreshed:', token);
    });

    return () => {
      unsubscribe();
      onTokenRefreshListener();
    };
  }, []);

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  };

  const createNotificationChannel = () => {
    PushNotification.createChannel(
      {
        channelId: 'default-channel-id', // You can use any unique ID here
        channelName: 'Default Channel', // This name will be shown to the user
        channelDescription: 'A default channel for notifications', // Optional description
        soundName: 'default', // Default notification sound
        importance: 4, // Importance level (1-5) => 4 is high importance
        vibrate: true, // Enable vibration
      },
      created => console.log(`createChannel returned '${created}'`), // Log if channel was created
    );
  };

  const handleButtonPress = () => {
    PushNotification.localNotification({
      channelId: 'default-channel-id', // Make sure this matches the ID you used to create the channel
      title: 'Test Notification',
      message: 'This is a test notification triggered by a button press',
    });
  };

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Button title="Send Test Notification" onPress={handleButtonPress} />
    </View>
  );
};

export default Notif;
