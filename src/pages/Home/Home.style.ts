import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  textHeader: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'black',
  },
  tag: {
    color: 'white',
    position: 'absolute',
    bottom: 0,
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 16,
    paddingVertical: 2,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 15,
    opacity: 1,
  },
  action: {
    color: 'white',
    position: 'absolute',
    top: 0,
    right: 0,
    fontSize: 18,
    fontWeight: '500',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 10,
    opacity: 1,
  }
});
