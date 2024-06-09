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
  // tambahkan layar lain di sini jika diperlukan
} & ParamListBase;

export default RootStackParamList;
