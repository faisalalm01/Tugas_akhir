/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import onBoardingStyle from './onBoarding.style';
import {NavigationProps} from '../../utils/Navigator';
import Swiper from 'react-native-swiper';
import {Image} from 'react-native';

type Props = {
  navigation: NavigationProps;
};

const OnBoarding: React.FC<Props> = ({navigation}) => {
  const [isLastSlide, setIsLastSlide] = useState(false);

  const slides = [
    {
      title: 'Welcome to Home Security Camera app',
      // description: 'Aplikasi ini membantu Anda ...',
      image: require('../../assets/onBoarding.png'),
    },
    {
      title: 'Provide security',
      description:
        'It provides 24/7 monitoring, giving customers peace of mind that their home is protected at all times.',
      image: require('../../assets/onBoarding2.png'),
    },
    {
      title: 'Automate',
      description:
        'Switch through different scenes and quick actions for fast management of your home',
      image: require('../../assets/onBoarding3.png'),
    },
    {
      title: 'Get Notified',
      description:
        'You can get all info about your home, family with your devices on the app and get notifications for any activity or alerts.',
      image: require('../../assets/onBoarding4.png'),
    },
  ];
  return (
    // <View style={onBoardingStyle.container}>
    //   <Text style={onBoardingStyle.title}>Welcome to My App</Text>
    //   <Text style={onBoardingStyle.subtitle}>
    //     Get started by exploring our features.
    //   </Text>
    //   <Button
    //     title="Continue"
    //     onPress={() => navigation.navigate('Login')} // Main merupakan nama stack atau navigator yang akan ditampilkan setelah onboarding selesai
    //   />
    // </View>
    <Swiper
      loop={false}
      showsPagination={!isLastSlide}
      onIndexChanged={index => setIsLastSlide(index === slides.length - 1)}>
      {slides.map((slide, index) => (
        <View key={index} style={onBoardingStyle.slide}>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image source={slide.image} style={onBoardingStyle.image} />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: '#3F5D89',
              justifyContent: 'center',
              paddingHorizontal: 20,
            }}>
            <Text style={onBoardingStyle.title}>{slide.title}</Text>
            <Text style={onBoardingStyle.description}>{slide.description}</Text>
            {isLastSlide && (
              <TouchableOpacity
                style={{
                  width: '100%',
                  backgroundColor: '#3F5D89',
                  alignItems: 'center',
                  borderWidth: 1,
                  borderColor: 'white',
                  paddingVertical: 15,
                  borderRadius: 10,
                }}
                onPress={() => navigation.replace('Login')}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>Login</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
    </Swiper>
  );
};

export default OnBoarding;
