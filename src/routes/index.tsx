import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../pages/Splashscreen/Splash.view';
import OnBoarding from '../pages/onBoarding/onBoarding.view';
import Login from '../pages/Login/Login.view';
import Register from '../pages/Register/Register.view';
import MainNavigator from './MainRoot';
import DetailHistory from '../pages/DetailHistory/DetailHistory.view';
import Otp from '../pages/Otp/Otp.view';
// import {checkTokens} from '../utils/checkToken'; // Pastikan path sesuai

const Stack = createNativeStackNavigator();

const RootNavigator = () => (
  <Stack.Navigator
    initialRouteName="Splashscreen"
    screenOptions={{
      headerShown: false,
      animation: 'fade_from_bottom',
      headerBackVisible: false,
    }}>
    <Stack.Screen name="Splashscreen" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Register" component={Register} />
    <Stack.Screen name="Main" component={MainNavigator} />
    <Stack.Screen name="OnBoarding" component={OnBoarding} />
    <Stack.Screen name="DetailHistory" component={DetailHistory} />
    <Stack.Screen name="OtpVerif" component={Otp} />
  </Stack.Navigator>
);

export default RootNavigator;
