import axios from 'axios';
import {DataResponse, LoginResponse, RegisterResponse} from './API/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    const token = response.data.data.access_token;
    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    console.error('Login error:', error);
    return {success: false, message: 'Login failed', code: 500};
  }
};

export const inputCctv = async (): Promise<DataResponse> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get<DataResponse>(`${BaseUrl}/cctv`, {
      headers: {
        access_token: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getDataCctv = async () => {
  try {
  } catch (error) {}
};

export const getDataHistory = async () => {
  try {
  } catch (error) {}
};
