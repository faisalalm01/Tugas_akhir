import {Dispatch} from 'redux';
import {
  getUserDataFailure,
  getUserDataSuccess,
  registerUserFailure,
  registerUserSuccess,
} from '../reducers/authReducers'; // Sesuaikan dengan tipe state Anda
import axios from 'axios';
import {LoginResponse, RegisterResponse, UserData} from '../../API/types';
import {BaseUrl} from '../../API/API';

export const login = (email: string, password: string) => {
  return async (dispatch: Dispatch<any>) => {
    try {
      const response = await axios.post<LoginResponse>(`${BaseUrl}/login`, {
        email,
        password,
      });
      dispatch({type: 'LOGIN_SUCCESS', payload: response.data});
      console.log(response.data);
    } catch (error: any) {
      dispatch({type: 'LOGIN_FAILURE', payload: error.message});
    }
  };
};

export const register = (
  username: string,
  email: string,
  password: string,
  notelp: string,
) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post<RegisterResponse>(
        `${BaseUrl}/register`,
        {username, email, password, notelp},
      );
      dispatch(registerUserSuccess(response.data)); // Dispatch action jika registrasi berhasil
    } catch (error: any) {
      dispatch(registerUserFailure(error.response.data.message)); // Dispatch action jika registrasi gagal
    }
  };
};

export const getUserData = () => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.get<UserData>(
        'https://example.com/api/userData',
      );
      dispatch(getUserDataSuccess(response.data)); // Dispatch action jika pengambilan data berhasil
    } catch (error: any) {
      dispatch(getUserDataFailure(error.response.data.message)); // Dispatch action jika pengambilan data gagal
    }
  };
};
