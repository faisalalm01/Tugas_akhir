import React, {useState} from 'react';
import {View, Text, Button} from 'react-native';
import onBoardingStyle from './onBoarding.style';
import {NavigationProps} from '../../utils/Navigator';
import Swiper from 'react-native-swiper';

type Props = {
  navigation: NavigationProps;
};

const OnBoarding: React.FC<Props> = ({navigation}) => {
  const [isLastSlide, setIsLastSlide] = useState(false);

  const slides = [
    {
      title: 'Welcome to Home Security Camera app',
      // description: 'Aplikasi ini membantu Anda ...',
      // image: require('./assets/onboarding-1.png'),
    },
    {
      title: 'Provide security',
      description:
        'It provides 24/7 monitoring, giving customers peace of mind that their home is protected at all times.',
      // image: require('./assets/onboarding-2.png'),
    },
    {
      title: 'Automate',
      description:
        'Switch through different scenes and quick actions for fast management of your home',
      // image: require('./assets/onboarding-3.png'),
    },
    {
      title: 'Get Notified',
      description:
        'You can get all info about your home, family with your devices on the app and get notifications for any activity or alerts.',
      // image: require('./assets/onboarding-3.png'),
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
          {/* <Image source={slide.image} style={onBoardingStyle.image} /> */}
          <Text style={onBoardingStyle.title}>{slide.title}</Text>
          <Text style={onBoardingStyle.description}>{slide.description}</Text>
          {isLastSlide && (
            <Button
              title="Selesai"
              onPress={() => navigation.replace('Login')}
            />
          )}
        </View>
      ))}
    </Swiper>
  );
};

export default OnBoarding;
