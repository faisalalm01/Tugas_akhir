/* eslint-disable react-native/no-inline-styles */
import {View, Alert, TextInput} from 'react-native';
import React, {useState} from 'react';
import {NavigationProps, RootProps} from '../../utils/Navigator';
import {OtpVerif} from '../../utils/API/types';
import {VerifyOtp} from '../../utils/API/API';
import OtpStyle from './Otp.style';
import ButtonPrimary from '../../components/ButtonPrimary';

type Props = {
  navigation: NavigationProps;
  route: RootProps;
};

const Otp: React.FC<Props> = ({navigation, route}) => {
  const [otp, setOtp] = useState<string>('');
  const {email} = route.params as {email: string};

  const handleOtpVerif = async () => {
    try {
      const response: OtpVerif = await VerifyOtp(email, otp);

      if (response.code === 200) {
        console.log('Verify success');
        navigation.navigate('Main');
      } else {
        Alert.alert('Verify failed', response.message || 'Unknown error');
      }
    } catch (error) {
      console.log('API error:', error);
      Alert.alert('Verify failed', 'An error occurred while trying to Verify');
    }
  };
  return (
    <View style={OtpStyle.Container}>
      <View style={OtpStyle.FormContainer}>
        <View style={{rowGap: 15}}>
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Enter OTP"
            style={OtpStyle.FormInput}
            value={otp}
            onChangeText={setOtp}
          />
        </View>
        <ButtonPrimary title={'Verify OTP'} onPress={handleOtpVerif} />
      </View>
    </View>
  );
};

export default Otp;
