/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {Alert, Text, TextInput, View} from 'react-native';
import LoginStyle from './Login.style';
import ButtonPrimary from '../../components/ButtonPrimary';
import {NavigationProps} from '../../utils/Navigator';
import {useSelector} from 'react-redux';
import {LoginResponse} from '../../utils/API/types';
import {loginUser} from '../../utils/API/API';
// import {login} from '../../utils/redux/actions/authActions';

type PropsHome = {
  navigation: NavigationProps;
};

const Login: React.FC<PropsHome> = ({navigation}) => {
  // const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginError = useSelector((state: any) => state.auth.error);
  const handleLogin = async () => {
    try {
      const response: LoginResponse = await loginUser(email, password);

      console.log(response.code);
      if (response.code === 401) {
        console.log(response.code);
      } else if (response.code === 200) {
        navigation.navigate('Main');
        console.log(response);
        Alert.alert('Login Success');
      }
    } catch (error) {
      console.log('API error:', error);
      Alert.alert('Login failed', 'An error occurred while trying to login');
    }
  };

  // const handleLogin = () => {
  //   dispatch(login(email, password));
  // };

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
              value={email}
              onChangeText={setEmail}
            />
            <TextInput
              placeholderTextColor={'#BFBFBF'}
              placeholder="Password"
              secureTextEntry={true}
              style={LoginStyle.FormInput}
              value={password}
              onChangeText={setPassword}
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
          <ButtonPrimary title={'Sign in'} onPress={handleLogin} />
          {loginError && <Text style={{color: 'red'}}>{loginError}</Text>}
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
