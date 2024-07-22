/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home/Home.view';
import History from '../pages/History/History.view';
import Profile from '../pages/Profile/Profile.view';
import HeaderComponent from '../components/HeaderComponenet';
import {NavigationProps} from '../utils/Navigator';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

type Props = {
  navigation: NavigationProps;
};

const Tab = createBottomTabNavigator();

const MainNavigator: React.FC<Props> = ({navigation}) => {
  return (
    <>
      <HeaderComponent
        pressAdd={() => {
          navigation.navigate('AddCctvIp');
        }}
        pressNotif={() => {
          navigation.navigate('Notification');
        }}
      />
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName: string | any;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'History') {
              iconName = focused
                ? 'clock-time-twelve'
                : 'clock-time-three-outline';
            } else if (route.name === 'Profile') {
              iconName = focused ? 'account-tie' : 'account-outline';
            }
            // Anda dapat mengembalikan komponen Icon apa pun yang Anda suka di sini!
            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'darkblue',
          tabBarInactiveTintColor: 'gray',
          headerShown: false,
        })}
        sceneContainerStyle={{
          backgroundColor: '#fff',
        }}
        initialRouteName="Home">
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="History" component={History} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </>
  );
};

export default MainNavigator;
