/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Text, TextInput, View} from 'react-native';
import LoginStyle from './Login.style';
import ButtonPrimary from '../../components/ButtonPrimary';
import {NavigationProps} from '../../utils/Navigator';

type PropsHome = {
  navigation: NavigationProps;
};

const Login: React.FC<PropsHome> = ({navigation}) => {
  return (
    <>
      <View style={LoginStyle.Container}>
        <Text style={LoginStyle.HeaderText}>Sign in</Text>
        <Text style={LoginStyle.DescText}>
          Welcome back you have been missed !
        </Text>
        <View style={LoginStyle.FormContainer}>
          <View style={{rowGap: 15, marginBottom: 4}}>
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="Email"
              style={LoginStyle.FormInput}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="Password"
              secureTextEntry={true}
              style={LoginStyle.FormInput}
            />
          </View>
          <Text
            style={{
              color: 'blue',
              fontWeight: '500',
              fontSize: 18,
              textAlign: 'right',
            }}>
            Forgot password ?
          </Text>
          <ButtonPrimary
            title={'Sign in'}
            onPress={() => navigation.navigate('Main')}
          />
        </View>
        <View style={{paddingTop: 25}}>
          <Text style={{color: 'black', fontSize: 18}}>
            Don’t have an account ?{' '}
            <Text
              onPress={() => navigation.navigate('Register')}
              style={{color: '#4EB7D9', fontWeight: '900'}}>
              Sign up
            </Text>
          </Text>
        </View>
      </View>
    </>
  );
};

export default Login;
