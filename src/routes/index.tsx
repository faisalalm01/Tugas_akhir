/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
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
import {NavigationProps} from '../utils/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {View} from 'react-native';
// import {checkTokens} from '../utils/checkToken';

const Stack = createNativeStackNavigator();
// const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

// const RootNavigator = () => {
//   return (
//     <>
//       <Stack.Navigator
//         initialRouteName="Splashscreen"
//         screenOptions={{
//           headerShown: false,
//           animation: 'fade_from_bottom',
//           headerBackVisible: false,
//         }}>
//         <Stack.Screen name="Splashscreen" component={Splash} />
//         {/* {isLoggedIn ? (
//       <> */}
//         <Stack.Screen name="Main" component={MainNavigator} />
//         <Stack.Screen name="DetailHistory" component={DetailHistory} />
//         <Stack.Screen name="OtpVerif" component={Otp} />
//         <Stack.Screen name="DetailUser" component={userDetail} />
//         <Stack.Screen name="AddCctvIp" component={AddCctv} />
//         <Stack.Screen name="DetailCctv" component={CctvDetail} />
//         <Stack.Screen name="Notification" component={Notif} />
//         <Stack.Screen name="CameraView" component={CameraView} />
//         {/* </>
//     ) : (
//       <> */}
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="OnBoarding" component={OnBoarding} />
//         {/* </>
//     )} */}
//       </Stack.Navigator>
//     </>
//   );
// };

// export default RootNavigator;

const RootNavigator = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    // Logic untuk mengecek status login pengguna
    const checkLoginStatus = async () => {
      const userToken = await getUserToken();
      setIsLoggedIn(!!userToken);
    };
    checkLoginStatus();
  }, []);

  return (
    <>
      <Stack.Navigator
        initialRouteName="Splashscreen"
        screenOptions={{
          headerShown: false,
          animation: 'fade_from_bottom',
          headerBackVisible: false,
        }}>
        <Stack.Screen name="Splashscreen" component={Splash} />
        <Stack.Screen name="Main" component={MainNavigator} />
        <Stack.Screen name="DetailHistory" component={DetailHistory} />
        <Stack.Screen name="OtpVerif" component={Otp} />
        <Stack.Screen name="DetailUser" component={userDetail} />
        <Stack.Screen name="AddCctvIp" component={AddCctv} />
        <Stack.Screen name="DetailCctv" component={CctvDetail} />
        <Stack.Screen name="Notification" component={Notif} />
        <Stack.Screen name="CameraView" component={CameraView} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="OnBoarding" component={OnBoarding} />
        {/* {isLoggedIn ? <></> : <></>} */}
      </Stack.Navigator>
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

export default RootNavigator;
