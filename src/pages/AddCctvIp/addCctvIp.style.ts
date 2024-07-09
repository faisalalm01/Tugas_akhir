import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  HeaderText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
  },
  DescText: {
    fontSize: 18,
    color: 'black',
    // borderWidth: 2,
    textAlign: 'center',
    marginVertical: 5,
  },
  FormContainer: {
    // borderColor: 'blue',
    // borderWidth: 2,
    width: '100%',
    paddingHorizontal: 30,
    marginTop: 25,
    // marginBottom: 0,
  },
  FormInput: {
    borderColor: '#477ED0',
    borderWidth: 1,
    width: 'auto',
    borderRadius: 5,
    fontSize: 20,
    paddingHorizontal: 15,
    color: 'black',
  },
});
