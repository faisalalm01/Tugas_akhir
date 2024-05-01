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
  box: {
    width: '100%',
    alignItems: 'center',
    height: 150,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
    borderBottomEndRadius: 30,
    borderBottomStartRadius: 30,
  },
  scrollViewContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
  },
  item: {
    // width: 150,
    paddingHorizontal: 35,
    height: 50,
    backgroundColor: '#eaeaea',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
