/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {View, Text, TouchableOpacity} from 'react-native';
// import '@tensorflow/tfjs-react-nartive';
import CameraStyle from './Camera.style';
import {NavigationProps} from '../../utils/Navigator';

type Props = {
  navigation: NavigationProps;
};

const CameraView: React.FC<Props> = ({navigation}) => {
  const devices = useCameraDevices();
  const device = devices.find(d => d.position === 'back');
  //   const cameraRef = useRef(null);
  //   const modelRef = useRef<tf.GraphModel | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      const status = await Camera.requestCameraPermission();
      if (status === 'denied') {
        console.warn('Camera permission not granted');
      }
    };

    // const loadModel = async () => {
    //   await tf.ready();
    //   // Ganti dengan path ke model YOLOv5 yang telah dikonversi
    //   const model = await tf.loadGraphModel('./assets/model/model.json');
    //   modelRef.current = model;
    // };

    requestPermission();
    // loadModel();
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
      <Camera
        style={CameraStyle.CameraStyle}
        device={device}
        isActive={true}
        // frameProcessor={frameProcessor}
        // fps={1}
      />
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
