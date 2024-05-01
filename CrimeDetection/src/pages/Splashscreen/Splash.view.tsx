/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Image, View} from 'react-native';
import SplashStyle from './Splash.style';
import {StackActions} from '@react-navigation/native';
import {NavigationProps} from '../../utils/Navigator';

type Props = {
  navigation: NavigationProps;
};

const Splash: React.FC<Props> = ({navigation}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.dispatch(StackActions.replace('OnBoarding'));
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <>
      <View style={SplashStyle.Container}>
        <Image
          source={require('../../assets/icon.png')}
          style={{width: 100, height: 100, resizeMode: 'contain'}}
          resizeMode="contain"
        />
        {/* <Text style={SplashStyle.textHeader}>Splash Screen</Text> */}
      </View>
    </>
  );
};

export default Splash;
