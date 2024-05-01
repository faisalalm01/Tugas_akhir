/* eslint-disable react-native/no-inline-styles */
// import Icon from 'react-native-vector-icons/FontAwesome';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {TouchableOpacityProps} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {IconName} from './Icon';

interface ButtonProps extends TouchableOpacityProps {
  icon: string;
  text: string;
}

const CardComponent: React.FC<ButtonProps> = ({icon, text, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardStyle}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <TouchableOpacity style={styles.iconstyle}>
          <MaterialIcons name={icon} color="#477ED0" size={30} />
        </TouchableOpacity>
        {/* </View> */}
        <Text style={styles.textStyle}>{text}</Text>
      </View>
      <View>
        <MaterialIcons name={IconName.MaterialIcons.Next} size={30} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardStyle: {
    borderWidth: 1,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    paddingVertical: 10,
    borderColor: '#D3CDCD',
    flexDirection: 'row',
    shadowColor: 'black',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  iconstyle: {
    zIndex: 2,
    width: 40,
    height: 40,
    borderRadius: 50,
    backgroundColor: '#E5EBF3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 18,
    marginHorizontal: 20,
    color: 'black',
  },
});

export default CardComponent;
