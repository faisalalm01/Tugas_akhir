/* eslint-disable react-native/no-inline-styles */
import {Text, Alert, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
// import CardComponent from '../../components/CardComponent';
// import {IconName} from '../../components/Icon';
import userDetailStyle from './userDetail.style';
import {userDetail, userUpdate} from '../../utils/API/API';
import {launchImageLibrary} from 'react-native-image-picker';
import {TextInput} from 'react-native-paper';
import ButtonPrimary from '../../components/ButtonPrimary';

const UserDetail = () => {
  const [user, setUser] = useState<any>(null);
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notelp, setNotelp] = useState<string>('');
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const responseData = await userDetail();
        setUser(responseData.data);
        setUsername(responseData.data.username);
        setEmail(responseData.data.email);
        setNotelp(responseData.data.notelp);
        setImage(responseData.data.image);
      } catch (error) {
        console.log(error);
        console.error('Fetch user detail error:', error);
      }
    };

    fetchUserDetail();
  }, [user]);

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setImage(response.assets[0]);
      }
    });
  };

  const handleUpdate = async () => {
    try {
      await userUpdate(username, notelp, image);
      Alert.alert('Success', 'User details updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update user details');
    }
  };

  if (!user) {
    return <Text>Loading...</Text>;
  }

  return (
    <>
      <View style={userDetailStyle.Container}>
        <View style={userDetailStyle.box}>
          <Text style={userDetailStyle.HeaderText}>User Detail</Text>
        </View>
        <View style={userDetailStyle.FormContainer}>
          <View style={{rowGap: 20, marginBottom: 2}}>
            <View style={{height: 160, alignItems: 'center'}}>
              <View style={userDetailStyle.cardPhoto} />
              <TouchableOpacity
                onPress={handleImagePicker}
                style={userDetailStyle.imageDisplay}
              />
            </View>
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="username"
              style={userDetailStyle.FormInput}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="email"
              style={userDetailStyle.FormInput}
              value={email}
              onChangeText={setEmail}
              disabled={true}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="No Telpon"
              // secureTextEntry={true}
              style={userDetailStyle.FormInput}
              value={notelp}
              onChangeText={setNotelp}
            />
          </View>
          <ButtonPrimary title={'Update'} onPress={handleUpdate} />
        </View>
      </View>
    </>
  );
};

export default UserDetail;
