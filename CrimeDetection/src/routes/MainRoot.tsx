/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home/Home.view';
import History from '../pages/History/History.view';
import Profile from '../pages/Profile/Profile.view';
import HeaderComponenet from '../components/HeaderComponenet';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <>
      <HeaderComponenet />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarInactiveBackgroundColor: '#F6F6F6',
          tabBarActiveBackgroundColor: '#F6F6F6',
        }}
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
