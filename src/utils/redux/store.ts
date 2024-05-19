import {configureStore} from '@reduxjs/toolkit';
// import thunk from 'redux-thunk';
import {rootReducer} from './reducers'; // Sesuaikan dengan reducer Anda

const store = configureStore({
  reducer: rootReducer,
  // middleware: [thunk],
});

export default store;
