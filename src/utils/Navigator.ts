import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from './Types';
import {RouteProp} from '@react-navigation/native';

export type NavigationProps = StackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type RootProps = RouteProp<RootStackParamList, keyof RootStackParamList>;
