/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import NotifStyle from './Notif.style';
import CardComponent from '../../components/CardComponent';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconName} from '../../components/Icon';
import {NavigationProps} from '../../utils/Navigator';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {userDetail} from '../../utils/API/API';
import io from 'socket.io-client';
import PushNotification from 'react-native-push-notification';

type Props = {
  navigation: NavigationProps;
};

const socket = io('http://localhost:5000');

const Notif: React.FC<Props> = () => {
  useEffect(() => {
    // Mengatur notifikasi
    PushNotification.configure({
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
      },
      popInitialNotification: true,
      requestPermissions: true,
    });

    // Mendengarkan event 'detection' dari server
    socket.on('detection', data => {
      console.log('Deteksi diterima:', data);
      const {detections} = data;
      if (detections.length > 0) {
        const detectionNames = detections
          .map((d: {name: any}) => d.name)
          .join(', ');
        PushNotification.localNotification({
          title: 'Deteksi Aktivitas',
          message: `Terdeteksi: ${detectionNames}`,
        });
      }
    });

    return () => {
      socket.off('detection');
    };
  }, []);
  return (
    <View style={NotifStyle.Container}>
      <View style={NotifStyle.box}>
        <Text style={NotifStyle.textHeader}>Notifikasi</Text>
      </View>
      <ScrollView style={NotifStyle.containerlist}>
        <View style={{rowGap: 6}}>
          <CardComponent
            icon={IconName.MaterialIcons.Notif}
            text={'Pencurian 10.00'}
          />
          <CardComponent
            icon={IconName.MaterialIcons.Notif}
            text={'Pencurian 15.00'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Notif;
