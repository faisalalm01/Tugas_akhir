import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

const ButtonPrimary: React.FC<ButtonProps> = ({title, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.ButtonStyle}>
      <Text style={styles.ButtonText}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  ButtonStyle: {
    backgroundColor: '#477ED0',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 20,
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    paddingVertical: 16,
  },
});

export default ButtonPrimary;
