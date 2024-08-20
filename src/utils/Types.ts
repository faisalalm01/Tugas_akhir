import {ParamListBase} from '@react-navigation/native';
// import {Props} from 'react-native-paper';

type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  OnBoarding: undefined;
  History: undefined;
  DetailHistory: {id: string};
  OtpVerif: {email: string};
  DetailUser: undefined;
  AddCctvIp: undefined;
  DetailCctv: {id: string};
  CameraView: {id: string};
  Notification: undefined;
  About: undefined;
  Support: undefined;
  UpdateCctv: {id: string}
  // tambahkan layar lain di sini jika diperlukan
} & ParamListBase;

export default RootStackParamList;
