import {StackNavigationProp} from '@react-navigation/stack';
import RootStackParamList from './Types';

export type NavigationProps = StackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;
