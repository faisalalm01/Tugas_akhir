/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import React, {useEffect, useState} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {View, Text, TouchableOpacity} from 'react-native';
import CameraStyle from './Camera.style';
import {NavigationProps} from '../../utils/Navigator';
import WebView from 'react-native-webview';
import {Linking} from 'react-native';
import Video from 'react-native-video';
import {getDetailCctv} from '../../utils/API/API';

type Props = {
  navigation: NavigationProps;
  route: any;
};

const CameraView: React.FC<Props> = ({navigation, route}) => {
  // const devices = useCameraDevices();
  // const device = devices.find(d => d.position === 'back');

  // useEffect(() => {
  //   const requestPermission = async () => {
  //     const status = await Camera.requestCameraPermission();
  //     if (status === 'denied') {
  //       console.warn('Camera permission not granted');
  //     }
  //   };

  //   requestPermission();
  // }, []);

  // if (device == null) {
  //   return (
  //     <View>
  //       <Text style={{fontSize: 20, color: 'black'}}>No camera available</Text>
  //     </View>
  //   );
  // }
  const [data, setData] = useState<any>();
  const [error, setError] = useState<string | null>(null);
  const {id} = route.params as {id: string};
  const cctvUrl = `http://192.168.119.11:3000/api/video_feed/${id}`;

  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const datas = await getDetailCctv(id);
        // console.log(data);
        setData(datas.data);
      } catch (err) {
        setError('Failed to fetch CCTV details');
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      {/* <Video
        source={{uri: 'rtsp://admin:RETCMV@192.168.169.1:554/H.264'}}
        style={CameraStyle.CameraStyle}
        resizeMode="cover"
        controls={true}
      /> */}
      {/* <View style={CameraStyle.container}> */}
      {/* <Video
        source={{uri: cctvUrl}}
        style={CameraStyle.webview}
        resizeMode="cover"
        controls={true}
      /> */}
      {/* <Text
        style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}
        onPress={() => Linking.openURL(cctvUrl)}>
        {cctvUrl}
      </Text> */}
      <WebView source={{uri: cctvUrl}} style={CameraStyle.CameraStyle} />
      <View
        style={{
          paddingHorizontal: 20,
          backgroundColor: 'white',
          justifyContent: 'center',
          alignItems: 'center',
          // borderWidth: 2,
          // borderColor: 'white',
          paddingVertical: 20,
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '30%',
        }}>
        <View style={{width: '100%'}}>
          <Text style={{color: 'black', fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>IP :</Text>
            <Text> {data?.ip}</Text>
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>User :</Text>
            <Text> {data?.usercctv}</Text>
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Password :</Text>
            <Text> {data?.passcctv}</Text>
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Path :</Text>
            <Text> {data?.path}</Text>
          </Text>
          <Text style={{color: 'black', fontSize: 20}}>
            <Text style={{fontWeight: 'bold'}}>Location :</Text>
            <Text> {data?.lokasi}</Text>
          </Text>
        </View>
        <TouchableOpacity
          style={CameraStyle.buttonStyle}
          onPress={() => navigation.navigate('Main')}>
          <Text>back</Text>
        </TouchableOpacity>
      </View>
      {/* </View> */}
      {/* <Camera style={CameraStyle.CameraStyle} device={device} isActive={true} /> */}
    </>
  );
};

export default CameraView;
