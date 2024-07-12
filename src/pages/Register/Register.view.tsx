/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput, Alert} from 'react-native';
import React, {useState} from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import RegisterStyle from './Register.style';
import {NavigationProps} from '../../utils/Navigator';
import {RegisterResponse} from '../../utils/API/types';
import {registerUser} from '../../utils/API/API';
// import {Checkbox} from 'react-native-paper';

type Props = {
  navigation: NavigationProps;
};

const Register: React.FC<Props> = ({navigation}) => {
  const [username, setUsername] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [notelp, setNotelp] = useState<string>('+62');

  const handleRegister = async () => {
    try {
      const response: RegisterResponse = await registerUser(
        username,
        email,
        password,
        notelp,
      );

      if (response.code === 200) {
        Alert.alert('Registration success');
        navigation.navigate('OtpVerif', {email: email});
      } else {
        Alert.alert('Registration failed', response.message || 'Unknown error');
      }
    } catch (error) {
      console.log('API error:', error);
      Alert.alert(
        'Registration failed',
        'An error occurred while trying to register',
      );
    }
  };
  return (
    <View style={RegisterStyle.Container}>
      <Text style={RegisterStyle.HeaderText}>Sign up</Text>
      <Text style={RegisterStyle.DescText}>
        Enter your email and password and start creating
      </Text>
      <View style={RegisterStyle.FormContainer}>
        <View style={{rowGap: 15, marginBottom: 20}}>
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Username"
            style={RegisterStyle.FormInput}
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Email"
            style={RegisterStyle.FormInput}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Password"
            secureTextEntry={true}
            style={RegisterStyle.FormInput}
            value={password}
            onChangeText={setPassword}
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="No Telp"
            style={RegisterStyle.FormInput}
            value={notelp}
            onChangeText={setNotelp}
            keyboardType="name-phone-pad"
            maxLength={13}
          />
        </View>
        <View style={{flexDirection: 'row'}}>
          {/* <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            onPress={() => {
              setChecked(!checked);
            }}
          /> */}
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              paddingRight: 50,
              color: 'black',
            }}>
            I agree to the{' '}
            <Text style={{color: '#4EB7D9'}}>Terms & Conditions</Text> and{' '}
            <Text style={{color: '#4EB7D9'}}>Privacy Policy</Text>
          </Text>
        </View>
        <ButtonPrimary title={'Create Account'} onPress={handleRegister} />
      </View>
      <View style={{paddingTop: 25}}>
        <Text style={{color: 'black', fontSize: 18}}>
          Already have an account ?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={{color: '#4EB7D9', fontWeight: '900'}}>
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default Register;
