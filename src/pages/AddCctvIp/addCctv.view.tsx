import {View, Text, Button} from 'react-native';
import React from 'react';
import {NavigationProps} from '../../utils/Navigator';

type Props = {
  navigation: NavigationProps;
};

const AddCctv: React.FC<Props> = ({navigation}) => {
  return (
    <View>
      <Button color={'black'} title="test" onPress={navigation.goBack} />
      <Text>AddCctv</Text>
    </View>
  );
};

export default AddCctv;
