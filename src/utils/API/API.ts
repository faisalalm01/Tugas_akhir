import axios from 'axios';
import {
  DataResponse,
  inputCctvResponse,
  inputLokasiResponse,
  LoginResponse,
  // OtpVerif,
  RegisterResponse,
  UserUpdateResponse,
} from './types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Alert} from 'react-native';

export const BaseUrl = 'https://hr9rk4nd-3000.asse.devtunnels.ms/api';

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

    console.log(response.data.data);
    if (response.data.data === undefined) {
      Alert.alert('email sudah terpakai');
    } else {
      return response.data;
    }
    return response.data;
  } catch (error) {
    // console.error('Registration error:', error);
    // return {message: 'Registration failed', code: 500};
    throw error;
  }
};

export const VerifyOtp = async (email: string, otp: string) => {
  try {
    const response = await axios.post(`${BaseUrl}/verify`, {
      email,
      otp,
    });

    return response.data;
  } catch (error) {
    console.log(error);
    // if (axios.isAxiosError(error) && error.response) {
    //   console.error('API error:', error.response.data);
    // } else {
    //   console.error('Fetch data error:', error);
    // }
    throw error;
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
    // if (!token) {
    //   throw new Error('No token found');
    // }
    const response = await axios.get(`${BaseUrl}/user/detail`, {
      headers: {
        Authorization: `bearer ${token}`,
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

export const userUpdate = async (
  username: string,
  notelp: string,
  image: {uri: string; type: string; name: string} | null = null,
): Promise<UserUpdateResponse> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const formData = new FormData();
    formData.append('username', username);
    formData.append('notelp', notelp);
    if (image) {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }
    const response = await axios.put(`${BaseUrl}/user/update`, formData, {
      headers: {
        Authorization: `bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error('API error:', error.response.data);
    } else {
      console.log(error);
      console.error('Update data error:', error);
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
    console.log(response.data);
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

export const inputCctv = async (
  protocols: string,
  ip: string,
  lokasiCamera: string,
  userIp: string,
  passwordUser: string,
  path: string,
  port: string,
  image: {uri: string; type: string; name: string} | null = null,
): Promise<inputCctvResponse> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const formData = new FormData();
    formData.append('protocol', protocols);
    formData.append('ip', ip);
    formData.append('lokasiCamera', lokasiCamera);
    formData.append('userIp', userIp);
    formData.append('passwordUser', passwordUser);
    formData.append('path', path);
    formData.append('port', port);
    if (image) {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }
    const response = await axios.post(`${BaseUrl}/cctv`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    // console.log(error);
    // console.error('Error inputting CCTV camera data', error);
    throw error;
  }
};

export const getDetailCctv = async (id: string) => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const response = await axios.get(`${BaseUrl}/cctv/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const getDataHistory = async (lokasi?: string) => {
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
      params: {
        // page,
        // limit,
        lokasi,
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
        Authorization: `Bearer ${token}`,
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

export const getDataLokasi = async (): Promise<DataResponse> => {
  try {
    const response = await axios.get(`${BaseUrl}/lokasi`, {
      headers: {
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

export const inputLokasi = async (
  namaLokasi: string,
): Promise<inputLokasiResponse> => {
  try {
    const response = await axios.post(
      `${BaseUrl}/lokasi`,
      {namaLokasi},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
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

export const deleteCctv = async (id: string): Promise<void> => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await axios.delete(`${BaseUrl}/cctv/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const updateCctvData = async (
  id: string,
  location: string,
  image: {uri: string; type: string; name: string} | null, // New Image
): Promise<any> => {
  try {
    const token = await AsyncStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }
    const formData = new FormData();
    formData.append('lokasiCamera', location);
    if (image) {
      formData.append('image', {
        uri: image.uri,
        type: image.type,
        name: image.name,
      });
    }
    // Sending PUT request to update CCTV data
    const response = await axios.put(`${BaseUrl}/cctv/update/${id}`, formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      },
    );
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