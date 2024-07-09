/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput} from 'react-native';
import React, {useState} from 'react';
import {NavigationProps} from '../../utils/Navigator';
import ButtonPrimary from '../../components/ButtonPrimary';
import addCctvIpStyle from './addCctvIp.style';
import Icon from 'react-native-vector-icons/AntDesign';
import {inputCctv} from '../../utils/API/API';

type Props = {
  navigation: NavigationProps;
};

const AddCctv: React.FC<Props> = ({navigation}) => {
  const [ip, setIp] = useState('');
  const [lokasiCamera, setLokasiCamera] = useState('');
  const [userIp, setUserIp] = useState('');
  const [passwordUser, setPasswordUser] = useState('');
  const [path, setPath] = useState('');
  const [port, setPort] = useState('');
  const [image, setImage] = useState('');

  const handleSubmit = async () => {
    try {
      const response = await inputCctv(
        ip,
        lokasiCamera,
        userIp,
        passwordUser,
        path,
        port,
        // image,
      );
      console.log('Response:', response);
      navigation.navigate('Main', {refresh: true});
      // Lakukan sesuatu dengan respon, seperti menavigasi ke layar lain atau menampilkan notifikasi
    } catch (error) {
      console.error('Error submitting form', error);
      // Tampilkan pesan kesalahan ke pengguna
    }
  };
  return (
    <>
      <View style={addCctvIpStyle.Container}>
        <Text style={addCctvIpStyle.HeaderText}>Input CCTV</Text>
        <View
          style={{
            paddingHorizontal: 15,
            paddingVertical: 8,
            marginTop: 20,
            opacity: 20,
            flexDirection: 'row',
            gap: 5,
          }}>
          <View>
            <Icon name={'warning'} color="red" size={25} />
          </View>
          <View>
            <Text style={addCctvIpStyle.DescText}>
              Gunakkan Ip CCTV dengan Protocol rtsp://
            </Text>
          </View>
        </View>
        <View style={addCctvIpStyle.FormContainer}>
          <View style={{rowGap: 15, marginBottom: 4}}>
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="192.168.xx.xx"
              style={addCctvIpStyle.FormInput}
              value={ip}
              onChangeText={setIp}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="User (optional)"
              style={addCctvIpStyle.FormInput}
              value={lokasiCamera}
              onChangeText={setLokasiCamera}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="Password (optional)"
              style={addCctvIpStyle.FormInput}
              value={port}
              onChangeText={setPort}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="Port (optional)"
              style={addCctvIpStyle.FormInput}
              value={path}
              onChangeText={setPath}
            />
          </View>
          <ButtonPrimary title={'Submit'} onPress={handleSubmit} />
        </View>
      </View>
    </>
  );
};

export default AddCctv;
