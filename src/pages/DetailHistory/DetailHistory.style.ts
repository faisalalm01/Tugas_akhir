import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    // color: 'black',
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
    // borderWidth: 2,
    // borderColor: 'blue',
  },
  scrollViewContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  textLabel: {
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  labelDetection: {
    color: 'red',
    fontSize: 25,
    fontWeight: 'bold',
  },
  textColor: {
    color: 'black',
    fontSize: 20,
  },
});
