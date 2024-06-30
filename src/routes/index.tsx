import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../pages/Splashscreen/Splash.view';
import OnBoarding from '../pages/onBoarding/onBoarding.view';
import Login from '../pages/Login/Login.view';
import Register from '../pages/Register/Register.view';
import MainNavigator from './MainRoot';
import DetailHistory from '../pages/DetailHistory/DetailHistory.view';
import Otp from '../pages/Otp/Otp.view';
import userDetail from '../pages/userDetail/userDetail.view';
import AddCctv from '../pages/AddCctvIp/addCctv.view';
import CctvDetail from '../pages/CctvDetail/cctvDetail.view';
import Notif from '../pages/Notification/Notif.view';
import CameraView from '../pages/CameraApp/Camera.view';
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
    <Stack.Screen name="DetailUser" component={userDetail} />
    <Stack.Screen name="AddCctvIp" component={AddCctv} />
    <Stack.Screen name="DetailCctv" component={CctvDetail} />
    <Stack.Screen name="Notification" component={Notif} />
    <Stack.Screen name="CameraView" component={CameraView} />
  </Stack.Navigator>
);

export default RootNavigator;
