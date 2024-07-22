/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, Text, View} from 'react-native';
import SplashStyle from './Splash.style';
import {StackActions} from '@react-navigation/native';
import {NavigationProps} from '../../utils/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {
  navigation: NavigationProps;
};

const Splash: React.FC<Props> = ({navigation}) => {
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     navigation.dispatch(StackActions.replace('OnBoarding'));
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, [navigation]);
  useEffect(() => {
    const checkLoginStatus = async () => {
      const userToken = await getUserToken();
      if (userToken) {
        navigation.dispatch(StackActions.replace('Main'));
      } else {
        navigation.dispatch(StackActions.replace('OnBoarding'));
      }
    };

    const timer = setTimeout(checkLoginStatus, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
      <View style={SplashStyle.Container}>
        <Image
          source={require('../../assets/icon.png')}
          style={{width: 200, height: 200, resizeMode: 'contain'}}
          resizeMode="contain"
        />
        <Text style={SplashStyle.textHeader}>Crime Detection</Text>
      </View>
    </>
  );
};

const getUserToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('token');
    return token;
  } catch (error) {
    console.error('Failed to fetch the token from storage', error);
    return null;
  }
};

export default Splash;
