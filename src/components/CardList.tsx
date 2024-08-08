import {StyleSheet, Text, TouchableOpacityProps, View} from 'react-native';
import React from 'react';

interface CardListProps extends TouchableOpacityProps {
  title: string;
  date: string;
  tagline: string;
  time: string;
}
const CardList: React.FC<CardListProps> = ({title, date, tagline, time}) => {
  return (
    <View style={styles.card}>
      <View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <View>
        <Text style={styles.tagline}>{tagline}</Text>
        <Text style={styles.tagline}>{time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderWidth: 2,
    borderColor: '#E2DADA',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 8,
    marginVertical: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    // borderBottomEndRadius: 30,
    // borderBottomStartRadius: 30,
  },
  title: {
    color: '#E5001B',
    fontSize: 16,
    fontWeight: '500',
  },
  date: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
  },
  tagline: {
    fontWeight: '500',
    color: '#1E1E1E',
  },
});

export default CardList;
