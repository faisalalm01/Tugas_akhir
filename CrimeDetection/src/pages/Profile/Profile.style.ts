import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 35,
  },
  cardProfile: {
    backgroundColor: '#E4EBF3',
    borderRadius: 15,
    paddingHorizontal: 25,
    paddingVertical: 15,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 50,
    backgroundColor: '#D9D9D9',
  },
});
