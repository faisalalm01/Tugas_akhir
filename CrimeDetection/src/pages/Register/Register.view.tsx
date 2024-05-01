/* eslint-disable react-native/no-inline-styles */
import {View, Text, TextInput} from 'react-native';
import React from 'react';
import ButtonPrimary from '../../components/ButtonPrimary';
import RegisterStyle from './Register.style';
import {NavigationProps} from '../../utils/Navigator';
// import {Checkbox} from 'react-native-paper';

type Props = {
  navigation: NavigationProps;
};

const Register: React.FC<Props> = ({navigation}) => {
  // const [checked, setChecked] = React.useState(false);

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
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Email"
            style={RegisterStyle.FormInput}
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="Password"
            secureTextEntry={true}
            style={RegisterStyle.FormInput}
          />
          <TextInput
            placeholderTextColor={'#BFBFBF'}
            placeholder="No Telp"
            style={RegisterStyle.FormInput}
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
        <ButtonPrimary
          title={'Create Account'}
          onPress={() => navigation.navigate('Login')}
        />
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
