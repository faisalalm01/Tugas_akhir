/* eslint-disable react-native/no-inline-styles */
import {Alert, Image, ScrollView, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import ProfileStyle from './Profile.style';
import CardComponent from '../../components/CardComponent';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconName} from '../../components/Icon';
import {NavigationProps} from '../../utils/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {userDetail} from '../../utils/API/API';

type Props = {
  navigation: NavigationProps;
};

const Profile: React.FC<Props> = ({navigation}) => {
  const [data, setData] = useState<any>([]);

  const fetchData = async () => {
    try {
      const responseData = await userDetail();
      setData(responseData.data);
    } catch (error) {
      // console.error('Fetch data error:', error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        fetchData();
      }
    };
    checkLoginStatus();
  }, [data]);

  const handleLogout = async () => {
    try {
      // Menghapus token dari AsyncStorage
      await AsyncStorage.removeItem('token');
      Alert.alert('Your Account is Logout');
      // Mengarahkan pengguna ke halaman Login
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      // navigation.replace('Login');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <ScrollView style={{marginHorizontal: 15}}>
      <View style={ProfileStyle.Container}>
        <Text style={ProfileStyle.textHeader}>Profile</Text>
      </View>
      <View style={{rowGap: 15}}>
        <View style={ProfileStyle.cardProfile}>
          <View style={{flexDirection: 'row'}}>
            <View>
              <Image
                source={
                  data.image
                    ? {uri: data.image}
                    : require('../../assets/profile.png')
                }
                style={ProfileStyle.circle}
              />
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
        </View>
        {/* <CardComponent
          icon={IconName.MaterialIcons.Refresh}
          text={'Change image'}
        /> */}
        <CardComponent
          icon={IconName.MaterialIcons.Notif}
          text={'Notification'}
        />
        <CardComponent
          icon={IconName.MaterialIcons.Question}
          text={'Support'}
        />
        <CardComponent icon={IconName.MaterialIcons.Info} text={'About us'} />
        <CardComponent
          icon={IconName.MaterialIcons.Logout}
          text={'Logout'}
          onPress={handleLogout}
        />
      </View>
    </ScrollView>
  );
};

export default Profile;
