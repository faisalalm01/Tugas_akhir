import axios from 'axios';
import {DataResponse, LoginResponse, OtpVerif, RegisterResponse} from './types';
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

export const VerifyOtp = async (
  email: string,
  otp: string,
): Promise<OtpVerif> => {
  try {
    const response = await axios.post(`${BaseUrl}/verify`, {
      email,
      otp,
    });

    return response.data;
  } catch (error) {
    console.error('otp error:', error);
    return {success: false, message: 'verify failed', code: 500};
  }
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  try {
    const response = await axios.post(
      `${BaseUrl}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    const token = response.data.data.access_token;
    await AsyncStorage.setItem('token', token);
    return response.data;
  } catch (error) {
    // console.log('Login error:', error);
    // return {success: false, message: 'Login failed', code: 500};
    throw error;
  }
};

export const userDetail = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${BaseUrl}/user/detail`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API error:', error.response.data);
    } else {
      console.error('Fetch data error:', error);
    }
    throw error;
  }
};

export const getDataCctv = async (): Promise<DataResponse> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${BaseUrl}/cctv`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    // console.error('get data error:', error);
    // return {success: false, message: 'Login failed', code: 500};
    if (axios.isAxiosError(error) && error.response) {
      console.error('API error:', error.response.data);
    } else {
      console.error('Fetch data error:', error);
    }
    throw error;
  }
};

export const inputCctv = async () => {
  try {
  } catch (error) {}
};

export const getDataHistory = async () => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${BaseUrl}/history`, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API error:', error.response.data);
    } else {
      console.error('Fetch data error:', error);
    }
    throw error;
  }
};

export const getDetailHistory = async (id: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${BaseUrl}/history/detail/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Ganti dengan token Anda jika diperlukan
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API error:', error.response.data);
    } else {
      console.error('Fetch data error:', error);
    }
    throw error;
  }
};
