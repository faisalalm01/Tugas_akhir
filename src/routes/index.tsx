import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../pages/Splashscreen/Splash.view';
import OnBoarding from '../pages/onBoarding/onBoarding.view';
import Login from '../pages/Login/Login.view';
import Register from '../pages/Register/Register.view';
import MainNavigator from './MainRoot';

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
  </Stack.Navigator>
);

export default RootNavigator;
