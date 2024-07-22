/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */

import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {NavigationProps} from '../../utils/Navigator';
import addCctvIpStyle from './addCctvIp.style';
import {getDataLokasi, inputCctv, inputLokasi} from '../../utils/API/API';
import {DataResponse} from '../../utils/API/types';
import {launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native';
import ButtonPrimary from '../../components/ButtonPrimary';
import Icon from 'react-native-vector-icons/AntDesign';

type Props = {
  navigation: NavigationProps;
};

const AddCctv: React.FC<Props> = ({navigation}) => {
  const [locations, setLocations] = useState<any[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [newLocation, setNewLocation] = useState<string>('');
  const [image, setImage] = useState<{
    uri: string;
    type: string;
    name: string;
  } | null>(null);
  const [ip, setIp] = useState<string>('');
  const [userIp, setUserIp] = useState<string>('');
  const [passwordUser, setPasswordUser] = useState<string>('');
  const [path, setPath] = useState<string>('');
  const [port, setPort] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    fetchLocations();
  }, [locations]);

  const fetchLocations = async () => {
    try {
      const data = await getDataLokasi();
      setLocations(data.data);
    } catch (error) {
      console.error('Error fetching locations', error);
    }
  };

  const handleAddLocation = async () => {
    if (newLocation.trim()) {
      try {
        const response = await inputLokasi(newLocation);
        setLocations([...locations, response]);
        setNewLocation('');
      } catch (error) {
        console.error('Error adding location', error);
      }
    } else {
      Alert.alert('Please enter a location name');
    }
  };

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        const asset = response.assets[0];
        setImage({
          uri: asset.uri || '',
          type: asset.type || '',
          name: asset.fileName || '',
        });
      }
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await inputCctv(
        ip,
        selectedLocation,
        userIp,
        passwordUser,
        path,
        port,
        image,
      );
      if (ip === '' || selectedLocation === '') {
        Alert.alert('Success', 'CCTV data submitted successfully');
      }
      Alert.alert('Success', 'CCTV data submitted successfully');
      navigation.navigate('Main');
    } catch (error) {
      // console.error('Error submitting CCTV data', error);
      Alert.alert(
        'Error Add CCTV',
        'ip, location and path are required, please input correctly',
      );
    }
  };

  const renderLocationItem = ({item}: {item: DataResponse}) => (
    <TouchableOpacity
      style={addCctvIpStyle.locationItem}
      onPress={() => {
        setSelectedLocation(item.namaLokasi);
        setModalVisible(false);
      }}>
      <Text style={{color: 'black', textAlign: 'center', fontSize: 20}}>
        {item.namaLokasi}
      </Text>
    </TouchableOpacity>
  );
  return (
    <>
      <View style={addCctvIpStyle.Container}>
        <Text style={addCctvIpStyle.HeaderText}>Input CCTV</Text>
        <View
          style={{
            paddingHorizontal: 15,
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
      </View>

      <ScrollView contentContainerStyle={addCctvIpStyle.FormContainer}>
        <View style={{rowGap: 15, marginBottom: 4}}>
          <View style={addCctvIpStyle.imageContainer}>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={addCctvIpStyle.imagePicker}>
              {image ? (
                <Image
                  source={{uri: image.uri}}
                  style={addCctvIpStyle.imagePreview}
                />
              ) : (
                <Text style={{fontSize: 20, color: '#BFBFBF'}}>
                  Select an Image
                </Text>
              )}
            </TouchableOpacity>
          </View>

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
            value={userIp}
            onChangeText={setUserIp}
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Password (optional)"
            style={addCctvIpStyle.FormInput}
            value={passwordUser}
            onChangeText={setPasswordUser}
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Port (optional)"
            style={addCctvIpStyle.FormInput}
            value={port}
            onChangeText={setPort}
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Path"
            style={addCctvIpStyle.FormInput}
            value={path}
            onChangeText={setPath}
          />
          <TouchableOpacity
            style={addCctvIpStyle.dropdown}
            onPress={() => setModalVisible(true)}>
            <Text style={{color: 'black', fontSize: 20, padding: 5}}>
              {selectedLocation || 'Select Location'}
            </Text>
          </TouchableOpacity>

          <Modal
            style={{backgroundColor: 'black'}}
            visible={modalVisible}
            transparent={true}
            animationType="slide">
            <View style={addCctvIpStyle.modalContainer}>
              <View style={addCctvIpStyle.modalContent}>
                <Button title="Close" onPress={() => setModalVisible(false)} />
                <FlatList
                  endFillColor={'black'}
                  data={locations}
                  renderItem={renderLocationItem}
                  keyExtractor={item => item.id}
                />

                <View style={{gap: 20}}>
                  <TextInput
                    placeholderTextColor={'#BFBFBF'}
                    style={addCctvIpStyle.FormInput}
                    value={newLocation}
                    onChangeText={setNewLocation}
                    placeholder="Add new location if not found"
                  />
                  <ButtonPrimary
                    title="Add Location"
                    onPress={handleAddLocation}
                  />
                </View>
              </View>
            </View>
          </Modal>
          <ButtonPrimary title={'Submit'} onPress={handleSubmit} />
        </View>
      </ScrollView>
    </>
  );
};

export default AddCctv;
