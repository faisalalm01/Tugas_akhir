/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {View, Text, ScrollView, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import DetaHistoryStyle from './DetailHistory.style';
import {NavigationProps} from '../../utils/Navigator';
import {useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getDetailHistory} from '../../utils/API/API';
import DetailHistoryStyle from './DetailHistory.style';

type Props = {
  navigation: NavigationProps;
  route: any;
};

const DetailHistory: React.FC<Props> = ({navigation}) => {
  const route = useRoute();
  const {id} = route.params as {id: string};
  const [history, setHistory] = useState<any>();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDetailHistory(id);
        // console.log(data);
        setHistory(data.data);
      } catch (err) {
        setError('Failed to fetch CCTV details');
      }
    };
    fetchData();
  }, [id]);

  if (error) {
    return <Text>{error}</Text>;
  }

  console.log(history);

  return (
    <>
      {history === undefined ? (
        <>
          <Text style={{marginTop: 75, paddingLeft: 30, position: 'absolute'}}>
            Not Found
          </Text>
        </>
      ) : (
        <>
          <Text
            style={{marginTop: 75, paddingLeft: 30, position: 'absolute'}}
            onPress={() => navigation.goBack()}>
            Back
          </Text>
          <View style={DetailHistoryStyle.Container}>
            <Image
              style={{
                width: '100%',
                height: '40%',
                // borderWidth: 2,
                // borderColor: 'red',
              }}
              // source={require('../../assets/detectTest.png')}
              source={{uri: history.image}}
            />
            <View style={{paddingTop: 35}}>
              <Text style={{fontSize: 15, color: 'black'}}>IP Camera</Text>
              <Text style={DetaHistoryStyle.textColor}>{history.cctv?.ip}</Text>
            </View>
            <View
              style={{
                paddingVertical: 35,
                rowGap: 15,
                // borderWidth: 2,
                // borderColor: 'green',
              }}>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  // paddingRight: 35,
                }}>
                <View style={{width: '50%'}}>
                  <Text style={DetaHistoryStyle.textLabel}>Detection : </Text>
                  <Text style={DetaHistoryStyle.labelDetection}>
                    {history.nama}
                  </Text>
                </View>
                <View
                  style={{
                    // borderWidth: 2,
                    // borderColor: 'red',
                    width: '50%',
                    paddingLeft: 40,
                  }}>
                  <Text style={DetaHistoryStyle.textLabel}>Date : </Text>
                  <Text style={DetaHistoryStyle.textColor}>
                    {history.createdAt.slice(0, 10)}
                  </Text>
                </View>
              </View>
              <View
                style={{
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  // paddingRight: 52,
                }}>
                <View style={{width: '50%'}}>
                  <Text style={DetaHistoryStyle.textLabel}>
                    Camera Position :{' '}
                  </Text>
                  <Text style={DetaHistoryStyle.textColor}>
                    {history.lokasi}
                  </Text>
                </View>
                <View
                  style={{
                    // borderWidth: 2,
                    // borderColor: 'red',
                    width: '50%',
                    paddingLeft: 40,
                  }}>
                  <Text style={DetaHistoryStyle.textLabel}>Time : </Text>
                  <Text style={DetaHistoryStyle.textColor}>
                    {history.createdAt.slice(11, 16)}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </>
      )}
    </>
  );
};

export default DetailHistory;
