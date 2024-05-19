import {combineReducers} from 'redux';
import {authReducer} from './authReducers';

export const rootReducer = combineReducers({
  auth: authReducer,
  // history: historyReducer,
});
