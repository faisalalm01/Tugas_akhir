import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { BaseUrl } from '../../utils/API/API';

const Notif = () => {
  const [deviceToken, setDeviceToken] = useState('');

  useEffect(() => {
    // Dapatkan device token
    const getToken = async () => {
      const token = await messaging().getToken();
      console.log('Device Token:', token);

      // Simpan token ke state
      setDeviceToken(token);

      // Kirim token ke server Flask
      fetch(`${BaseUrl}/register-token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ token })
      })
      .then(response => response.json())
      .then(data => {
        console.log('Token registered:', data.message);
      })
      .catch(error => {
        console.error('Error registering token:', error);
      });
    };

    getToken();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>React Native Firebase Notification</Text>
      <Text style={styles.tokenTitle}>Device Token:</Text>
      <Text style={styles.token}>{deviceToken}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  tokenTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  token: {
    fontSize: 14,
    color: '#333',
    // wordWrap: 'break-word',
  },
});

export default Notif;
