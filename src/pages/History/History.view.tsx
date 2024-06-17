/* eslint-disable react-native/no-inline-styles */
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import HistoryStyle from './History.style';
import CardList from '../../components/CardList';
import FilterComponent from '../../components/FilterComponent';
import {NavigationProps} from '../../utils/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDataHistory} from '../../utils/API/API';

type Props = {
  navigation: NavigationProps;
};

const History: React.FC<Props> = ({navigation}) => {
  const [data, setData] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>('All');
  const [locations, setLocations] = useState<string[]>(['All']);

  const fetchData = async () => {
    try {
      const responseData = await getDataHistory();
      setData(responseData.data);
      const uniqueLocations: any[] = [
        'All',
        ...Array.from(
          new Set(responseData.data.map((item: any) => item.lokasi)),
        ),
      ];
      setLocations(uniqueLocations);
    } catch (error) {
      console.error('Fetch data error:', error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        // setIsLoggedIn(true);
        fetchData();
      }
    };
    checkLoginStatus();
  }, []);

  const filteredData =
    filter === 'All' ? data : data.filter(item => item.lokasi === filter);

  return (
    <>
      <View style={HistoryStyle.box}>
        <Text style={HistoryStyle.textHeader}>History</Text>
      </View>
      <View style={{marginHorizontal: 15}}>
        <ScrollView
          horizontal
          contentContainerStyle={HistoryStyle.scrollViewContainer}>
          {locations.map(location => (
            <FilterComponent
              key={location}
              name={location}
              // isActive={filter === location}
              onPress={() => setFilter(location)}
            />
          ))}
          {/* <FilterComponent name="All" />
          <FilterComponent name="Garrage" />
          <FilterComponent name="Room1" />
          <FilterComponent name="Outside" />
          <FilterComponent name="Room2" />
          <FilterComponent name="Parking" /> */}
        </ScrollView>
        <ScrollView style={{marginBottom: 45}}>
          {filteredData.map(item => (
            <TouchableOpacity
              key={item.id}
              onPress={() =>
                navigation.navigate('DetailHistory', {id: item.id})
              }>
              <CardList
                title={item.nama}
                date={item.createdAt.slice(0, 10)}
                tagline={item.lokasi}
              />
            </TouchableOpacity>
          ))}
          {/* <CardList title="Perampokan" date="24/07/2024" tagline="Garage" />
          <CardList title="Pencurian" date="24/07/2024" tagline="room2" />
          <CardList title="Penculikan" date="24/07/2024" tagline="Garage" /> */}
        </ScrollView>
      </View>
    </>
  );
};

export default History;
