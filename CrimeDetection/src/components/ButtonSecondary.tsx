import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface ButtonProps extends TouchableOpacityProps {
  icon: string;
}

const ButtonSecondary: React.FC<ButtonProps> = ({icon, onPress}) => {
  return (
    <TouchableOpacity style={styles.circle} onPress={onPress}>
      <Icon name={icon} color="#477ED0" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  circle: {
    zIndex: 2,
    width: 45,
    height: 45,
    borderRadius: 50,
    backgroundColor: '#E5EBF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ButtonSecondary;
