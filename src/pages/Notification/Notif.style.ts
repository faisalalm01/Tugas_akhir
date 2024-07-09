import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    flex: 1,
  },
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 20,
    paddingBottom: 20,
  },
  containerlist: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  box: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingTop: 50,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
});
