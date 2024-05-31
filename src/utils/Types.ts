import {ParamListBase} from '@react-navigation/native';

type RootStackParamList = {
  Splash: undefined;
  Register: undefined;
  Login: undefined;
  Home: undefined;
  Profile: undefined;
  OnBoarding: undefined;
  DetailHistory: undefined;
  // tambahkan layar lain di sini jika diperlukan
} & ParamListBase;

export default RootStackParamList;
