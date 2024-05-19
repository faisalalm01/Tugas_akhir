import axios from 'axios';
import {LoginResponse, RegisterResponse} from './types';

export const BaseUrl = 'https://jxsb6npw-3000.asse.devtunnels.ms/api';

export const registerUser = async (
  username: string,
  email: string,
  password: string,
  notelp: string,
): Promise<RegisterResponse> => {
  try {
    const response = await axios.post(`${BaseUrl}/register`, {
      username,
      email,
      password,
      notelp,
    });

    return response.data;
  } catch (error) {
    console.error('Registration error:', error);
    return {success: false, message: 'Registration failed', code: 500};
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(`${BaseUrl}/login`, {
      email,
      password,
    });

    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return {success: false, message: 'Login failed', code: 500};
  }
};
