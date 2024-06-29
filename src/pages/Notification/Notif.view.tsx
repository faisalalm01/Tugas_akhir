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
    <ScrollView style={{marginHorizontal: 15}}>
      <View style={NotifStyle.Container}>
        <Text style={NotifStyle.textHeader}>Notifikasi</Text>
      </View>
      <View style={{rowGap: 15}}>
        {/* <View style={NotifStyle.cardProfile}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={NotifStyle.circle} />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 17, fontWeight: '800', color: 'black'}}>
                {data.username}
              </Text>
              <Text style={{fontSize: 14, color: 'black'}}>{data.email}</Text>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <MaterialIcons
              name={'edit'}
              size={30}
              color={'#909090'}
              onPress={() => {
                navigation.navigate('DetailUser');
              }}
            />
          </View>
        </View> */}
        {/* <CardComponent
          icon={IconName.MaterialIcons.Refresh}
          text={'Change image'}
        /> */}
        <CardComponent
          icon={IconName.MaterialIcons.Notif}
          text={'Pencurian 10.00'}
        />
        <CardComponent
          icon={IconName.MaterialIcons.Notif}
          text={'Pencurian 10.00'}
        />
        {/* <CardComponent icon={IconName.MaterialIcons.Info} text={'About us'} /> */}
      </View>
    </ScrollView>
  );
};

export default Notif;
