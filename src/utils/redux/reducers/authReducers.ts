import {LoginResponse, RegisterResponse, UserData} from '../../API/types';

// authReducer.ts
interface AuthState {
  user: UserData | null;
  error: string;
}

const initialState: AuthState = {
  user: null,
  error: '',
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
    case 'GET_USER_DATA_SUCCESS':
      return {...state, user: action.payload, error: ''};
    case 'LOGIN_FAILURE':
    case 'REGISTER_FAILURE':
    case 'GET_USER_DATA_FAILURE':
      return {...state, user: null, error: action.payload};
    default:
      return state;
  }
};

export const loginUserSuccess = (response: LoginResponse) => ({
  type: 'LOGIN_SUCCESS',
  payload: response,
});

export const loginUserFailure = (error: string) => ({
  type: 'LOGIN_FAILURE',
  payload: error,
});

export const registerUserSuccess = (response: RegisterResponse) => ({
  type: 'REGISTER_SUCCESS',
  payload: response,
});

export const registerUserFailure = (error: string) => ({
  type: 'REGISTER_FAILURE',
  payload: error,
});

export const getUserDataSuccess = (data: UserData) => ({
  type: 'GET_USER_DATA_SUCCESS',
  payload: data,
});

export const getUserDataFailure = (error: string) => ({
  type: 'GET_USER_DATA_FAILURE',
  payload: error,
});
