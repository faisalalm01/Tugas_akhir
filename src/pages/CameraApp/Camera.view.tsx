/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {View, Text, TouchableOpacity} from 'react-native';
import CameraStyle from './Camera.style';
import {NavigationProps} from '../../utils/Navigator';
import Video from 'react-native-video';

type Props = {
  navigation: NavigationProps;
};

const CameraView: React.FC<Props> = ({navigation}) => {
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      if (status === 'denied') {
        console.warn('Camera permission not granted');
      }
    };

    requestPermission();
  }, []);

  if (device == null) {
    return (
      <View>
        <Text style={{fontSize: 20, color: 'black'}}>No camera available</Text>
      </View>
    );
  }

  return (
    <>
      <Video
        source={{uri: 'rtsp://admin:RETCMV@192.168.56.1:554/H.264'}}
        style={CameraStyle.CameraStyle}
        resizeMode="cover"
        controls={true}
      />
      {/* <Camera style={CameraStyle.CameraStyle} device={device} isActive={true} /> */}
      <View
        style={{
          paddingHorizontal: 20,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={CameraStyle.buttonStyle}
          onPress={() => navigation.navigate('Main')}>
          <Text>Back</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default CameraView;
