/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import HistoryStyle from './History.style';
import CardList from '../../components/CardList';
import FilterComponent from '../../components/FilterComponent';
import {NavigationProps} from '../../utils/Navigator';

type Props = {
  navigation: NavigationProps;
};

const History: React.FC<Props> = () => {
  return (
    <>
      <View style={HistoryStyle.box}>
        <Text style={HistoryStyle.textHeader}>History</Text>
      </View>
      <View style={{marginHorizontal: 15}}>
        <ScrollView
          horizontal
          contentContainerStyle={HistoryStyle.scrollViewContainer}>
          <FilterComponent name="All" />
          <FilterComponent name="Garrage" />
          <FilterComponent name="Room1" />
          <FilterComponent name="Outside" />
          <FilterComponent name="Room2" />
          <FilterComponent name="Parking" />
        </ScrollView>
        <ScrollView style={{marginBottom: 45}}>
          <CardList title="Pencurian" date="24/07/2024" tagline="outside" />
          <CardList title="Perampokan" date="24/07/2024" tagline="Garage" />
          <CardList title="Pencurian" date="24/07/2024" tagline="room2" />
          <CardList title="Penculikan" date="24/07/2024" tagline="Garage" />
        </ScrollView>
      </View>
    </>
  );
};

export default History;
