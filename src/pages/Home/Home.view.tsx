/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, Text, View } from 'react-native';
import HomeStyle from './Home.style';
import { NavigationProps } from '../../utils/Navigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { deleteCctv, getDataCctv, userDetail } from '../../utils/API/API';
import Icon from 'react-native-vector-icons/FontAwesome5';

type Props = {
  navigation: NavigationProps;
  route: any;
};

const Home: React.FC<Props> = ({ navigation, route }) => {
  const [data, setData] = useState<any[]>([]);
  const [userData, setUserData] = useState<any>({});
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchData = async () => {
    try {
      const responseUserData = await userDetail();
      setUserData(responseUserData.data);
    } catch (error) {
      console.error('Fetch data error:', error);
    }
  };

  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        setIsLoggedIn(true);
        fetchData();
        setRefresh(true);
      }
    };
    checkLoginStatus();
  }, []);

  useEffect(() => {
    const dataCctv = async () => {
      const responseData = await getDataCctv();
      if (responseData) {
        setData(responseData.data);
      }
    };
    dataCctv();
    setRefresh(true);
  }, [data]);

  const handleDelete = (id: string) => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete this CCTV?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Yes',
          onPress: async () => {
            try {
              await deleteCctv(id);
              setRefresh(prev => !prev);
            } catch (error) {
              console.error('Delete error:', error);
            }
          },
        },
      ],
      { cancelable: true }
    );
  };

  return (
    <>
      <View style={{ alignSelf: 'flex-end' }}>
        {/* <Ionicons name="home" color="black" size={20} /> */}
      </View>
      <View style={{ padding: 15 }}>
        <View style={{ marginBottom: 60 }}>
          <Text style={{ fontSize: 20, color: 'black', fontWeight: '500' }}>
            Hi, {userData.username}!
          </Text>
          <Text style={HomeStyle.textHeader}>Be sure of your safety</Text>
        </View>
        <ScrollView>
          {data.length === 0 ? (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Text style={{ color: 'gray', fontSize: 20, fontWeight: 'bold' }}>
                Data Not Found, Add "+" Your CCTV
              </Text>
            </View>
          ) : (
            <View style={{ rowGap: 10, marginBottom: 200 }}>
              {data.map(item => (
                <View
                  key={item.id}
                  onTouchMove={() =>
                    navigation.navigate('CameraView', { id: item.id })
                  }
                  style={{ width: '100%', height: 135, borderRadius: 15 }}>
                  <Image
                    source={
                      item.image
                        ? { uri: item.image }
                        : require('../../assets/Frame_banner.png')
                    }
                    style={{
                      flex: 1,
                      width: '100%',
                      height: '100%',
                      borderRadius: 15,
                      borderWidth: 0.5,
                      borderColor: 'black',
                    }}
                  />
                  <View style={[HomeStyle.action, { flexDirection: 'row', justifyContent: 'space-between', gap: 10}]}>
                    <Icon name='trash-alt' color={'white'} size={15} onPress={() => handleDelete(item.id)}/>
                    <Icon name='edit' color={'white'} size={15}/>
                  </View>
                  <Text style={HomeStyle.tag}>{item.lokasiCamera}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
