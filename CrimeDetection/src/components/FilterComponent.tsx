import {
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import React from 'react';

interface filterProps extends TouchableOpacityProps {
  name: string;
}

const FilterComponent: React.FC<filterProps> = ({name, onPress}) => {
  return (
    <>
      <TouchableOpacity style={styles.item} onPress={onPress}>
        <Text style={styles.text}>{name}</Text>
      </TouchableOpacity>
    </>
  );
};

export default FilterComponent;

const styles = StyleSheet.create({
  item: {
    // width: 150,
    paddingHorizontal: 35,
    height: 50,
    backgroundColor: '#EFF7F9',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#3685FB',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3685FB',
  },
});
