/* eslint-disable react-native/no-inline-styles */
import {ScrollView, Text, View} from 'react-native';
import React from 'react';
import ProfileStyle from './Profile.style';
import CardComponent from '../../components/CardComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconName} from '../../components/Icon';
import {NavigationProps} from '../../utils/Navigator';

type Props = {
  navigation: NavigationProps;
};

const Profile: React.FC<Props> = () => {
  return (
    <ScrollView style={{marginHorizontal: 15}}>
      <View style={ProfileStyle.Container}>
        <Text style={ProfileStyle.textHeader}>Profile</Text>
      </View>
      <View style={{rowGap: 15}}>
        <View style={ProfileStyle.cardProfile}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <View style={ProfileStyle.circle} />
            </View>
            <View
              style={{
                paddingHorizontal: 15,
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 17, fontWeight: '800', color: 'black'}}>
                Faisal Ali Muhamad
              </Text>
              <Text style={{fontSize: 14}}>faisalali2858@gmail.com</Text>
            </View>
          </View>
          <View style={{justifyContent: 'center'}}>
            <MaterialIcons
              name={'edit'}
              size={30}
              color={'#909090'}
              onPress={() => {}}
            />
          </View>
        </View>
        <CardComponent
          icon={IconName.MaterialIcons.Refresh}
          text={'Change image'}
        />
        <CardComponent
          icon={IconName.MaterialIcons.Notif}
          text={'Notification'}
        />
        <CardComponent
          icon={IconName.MaterialIcons.Question}
          text={'Support'}
        />
        <CardComponent icon={IconName.MaterialIcons.Info} text={'About us'} />
      </View>
    </ScrollView>
  );
};

export default Profile;
