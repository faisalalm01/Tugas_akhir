/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import HomeStyle from './Home.style';
import {NavigationProps} from '../../utils/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataCctv, userDetail} from '../../utils/API/API';

type Props = {
  navigation: NavigationProps;
};

const Home: React.FC<Props> = () => {
  const [data, setData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  // const token = AsyncStorage.getItem('token');
  // console.log(token);

  const fetchData = async () => {
    try {
      const responseData = await getDataCctv();
      const responseUserData = await userDetail();
      setUserData(responseUserData.data);
      setData(responseData.data);
    } catch (error) {
      console.error('Fetch data error:', error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        fetchData();
      }
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <View style={{alignSelf: 'flex-end'}}>
        {/* <Ionicons name="home" color="black" size={20} /> */}
      </View>
      <View style={{padding: 15}}>
        <View style={{marginBottom: 60}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            Hi, {userData.username}!
          </Text>
          <Text style={HomeStyle.textHeader}>Be sure of your safety</Text>
        </View>
        <ScrollView>
          <View style={{rowGap: 10, marginBottom: 200}}>
            {data.map(item => (
              <View key={item.id}>
                <Image
                  id={item.id}
                  source={require('../../assets/Homepage-Home.png')}
                  style={{width: '100%', height: 135, borderRadius: 15}}
                />
                {/* <Text style={{color: 'black'}}>{item.lokasiCamera}</Text> */}
              </View>
            ))}
            {/* <Image
              source={require('../../assets/Homepage-Home.png')}
              style={{width: '100%', height: 135, borderRadius: 15}}
            /> */}
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
