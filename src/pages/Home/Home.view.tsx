/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import {Image, ScrollView, Text, View} from 'react-native';
import HomeStyle from './Home.style';
import {NavigationProps} from '../../utils/Navigator';

type Props = {
  navigation: NavigationProps;
};

const Home: React.FC<Props> = () => {
  return (
    <>
      <View style={{alignSelf: 'flex-end'}}>
        {/* <Ionicons name="home" color="black" size={20} /> */}
      </View>
      <View style={{padding: 15}}>
        <View style={{marginBottom: 60}}>
          <Text style={{fontSize: 20, color: 'black', fontWeight: '500'}}>
            Hi, Faisal!
          </Text>
          <Text style={HomeStyle.textHeader}>Be sure of your safety</Text>
        </View>
        <ScrollView>
          <View style={{rowGap: 10, marginBottom: 200}}>
            <Image
              source={require('../../assets/Homepage-Home.png')}
              style={{width: '100%', height: 135, borderRadius: 15}}
            />
            <Image
              source={require('../../assets/Homepage-Home.png')}
              style={{width: '100%', height: 135, borderRadius: 15}}
            />
          </View>
        </ScrollView>
      </View>
    </>
  );
};

export default Home;
