import {Text, Alert, View, TouchableOpacity, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useRoute} from '@react-navigation/native';
import {TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import ButtonPrimary from '../../components/ButtonPrimary';
import {Image} from 'react-native';
import {getDetailCctv, updateCctvData} from '../../utils/API/API';
import addCctvIpStyle from '../AddCctvIp/addCctvIp.style'; 
import {NavigationProps} from '../../utils/Navigator';

type Props = {
  navigation: NavigationProps;
};

const UpdateCCTV: React.FC<Props> = ({navigation}) => {
  const route = useRoute();
  const {id} = route.params as {id: string}; // Ambil ID CCTV dari route params

  const [cctv, setCctv] = useState<any>(null);
  const [lokasiCamera, setLokasiCamera] = useState<string>(''); 
  const [image, setImage] = useState<any>(null); 
  const [initialImage, setInitialImage] = useState<string | null>(null); 

  useEffect(() => {
    const fetchCctvDetail = async () => {
      try {
        const responseData = await getDetailCctv(id);
        setCctv(responseData.data)
        setLokasiCamera(responseData.data.lokasiCamera);
        setImage(responseData.data.image);
        if (responseData.data.image) {
          setInitialImage(responseData.data.image);
        }
      } catch (error) {
        console.error('Fetch CCTV detail error:', error);
      }
    };

    fetchCctvDetail();
    console.log(fetchCctvDetail());
    
  }, []);

  const handleImagePicker = () => {
    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
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

  const handleUpdate = async () => {
    try {
      await updateCctvData(id, lokasiCamera, image);
      navigation.navigate('Main'); 
      Alert.alert('Success', 'CCTV details updated successfully');
    } catch (error) {
      Alert.alert('Error', 'Failed to update CCTV details');
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={addCctvIpStyle.FormContainer}>
        <View style={{rowGap: 15, marginBottom: 4}}>
          <View style={addCctvIpStyle.imageContainer}>
            <TouchableOpacity
              onPress={handleImagePicker}
              style={addCctvIpStyle.imagePicker}>
              {image && image.uri ? (
                <Image
                  source={{uri: image.uri}}
                  style={addCctvIpStyle.imagePreview}
                />
              ) : (
                <Image
                  source={
                    initialImage
                      ? {uri: initialImage}
                      : require('../../assets/Frame_banner.png')
                  }
                  style={addCctvIpStyle.imagePreview}
                />
              )}
            </TouchableOpacity>
          </View>

          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Lokasi Kamera"
            style={addCctvIpStyle.FormInput}
            value={lokasiCamera}
            onChangeText={setLokasiCamera}
          />

          <ButtonPrimary title={'Update CCTV'} onPress={handleUpdate} />
        </View>
      </ScrollView>
    </>
  );
};

export default UpdateCCTV;
