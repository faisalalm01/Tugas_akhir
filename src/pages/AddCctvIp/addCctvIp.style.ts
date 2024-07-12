import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  Container: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    width: '100%',
    // height: '100%',
    shadowColor: '#000',
    paddingBottom: 30,
    paddingTop: 60,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
  },
  box: {
    paddingVertical: 20,
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
  textHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginVertical: 35,
  },
  scrollViewContainer: {
    gap: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
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
    // marginTop: 25,
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

  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
    justifyContent: 'center',
  },
  modalContainer: {
    color: 'black',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 4,
    padding: 20,
    width: '80%',
  },
  locationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  imageContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  imagePicker: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
});
