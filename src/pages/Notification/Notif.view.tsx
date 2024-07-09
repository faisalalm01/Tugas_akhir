/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import NotifStyle from './Notif.style';
import CardComponent from '../../components/CardComponent';
// import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconName} from '../../components/Icon';
import {NavigationProps} from '../../utils/Navigator';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {userDetail} from '../../utils/API/API';

type Props = {
  navigation: NavigationProps;
};

const Notif: React.FC<Props> = () => {
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
