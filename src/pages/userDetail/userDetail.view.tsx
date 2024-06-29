/* eslint-disable react-native/no-inline-styles */
import {Text, Alert, View} from 'react-native';
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
  const [notelp, setNotelp] = useState<string>('');
  const [image, setImage] = useState<any>(null);

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        const responseData = await userDetail();
        setUser(responseData.data);
        setUsername(responseData.data.username);
        setNotelp(responseData.data.notelp);
        setImage(responseData.data.image);
      } catch (error) {
        console.error('Fetch user detail error:', error);
      }
    };

    fetchUserDetail();
  }, []);

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
    // <ScrollView>
    //   <View style={userDetailStyle.Container}>
    //     <View style={userDetailStyle.Container}>
    //       <Text style={userDetailStyle.textHeader}>Profile</Text>
    //     </View>
    //     <View style={{rowGap: 15}}>
    //       <View style={userDetailStyle.cardProfile}>
    //         <View style={{}}>
    //           <View>
    //             <View style={userDetailStyle.circle} />
    //           </View>
    //         </View>
    //       </View>
    //       <CardComponent
    //         icon={IconName.MaterialIcons.Refresh}
    //         text={'Change image'}
    //       />
    //       <CardComponent
    //         icon={IconName.MaterialIcons.Notif}
    //         text={'Notification'}
    //       />
    //       <CardComponent
    //         icon={IconName.MaterialIcons.Question}
    //         text={'Support'}
    //       />
    //       <CardComponent icon={IconName.MaterialIcons.Info} text={'About us'} />
    //       <CardComponent
    //         icon={IconName.MaterialIcons.Logout}
    //         text={'Logout'}
    //         //   onPress={handleLogout}
    //       />
    //     </View>
    //   </View>
    // </ScrollView>
    <>
      {/* <Text style={userDetailStyle.header}>User Detail and Update</Text>
      <TextInput
        style={userDetailStyle.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={userDetailStyle.input}
        placeholder="Phone Number"
        value={notelp}
        onChangeText={setNotelp}
      />
      {image && (
        <View style={{borderWidth: 2}}>
          <Image source={{uri: image.uri}} style={userDetailStyle.image} />
        </View>
      )}
      <Button title="Pick an image" onPress={handleImagePicker} />
      <Button title="Update Details" onPress={handleUpdate} /> */}

      <View style={userDetailStyle.Container}>
        <Text style={userDetailStyle.HeaderText}>User Update</Text>
        <View style={userDetailStyle.FormContainer}>
          <View style={{rowGap: 15, marginBottom: 2}}>
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="username"
              style={userDetailStyle.FormInput}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="Password"
              secureTextEntry={true}
              style={userDetailStyle.FormInput}
              value={notelp}
              onChangeText={setNotelp}
            />
          </View>
          {/* <Text
            style={{
              color: 'blue',
              fontWeight: '500',
              fontSize: 18,
              textAlign: 'right',
            }}>
            Forgot password ?
          </Text> */}
          <ButtonPrimary title={'Pick an image'} onPress={handleImagePicker} />
          <ButtonPrimary title={'Update'} onPress={handleUpdate} />
        </View>
      </View>
    </>
  );
};

export default UserDetail;
