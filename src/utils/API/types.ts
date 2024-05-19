import {SetStateAction} from 'react';

export interface LoginResponse {
  success: boolean;
  code?: number;
  message?: string;
  token?: string;
  user?: UserData;
  // data?: [];
}

export interface RegisterResponse {
  success: boolean;
  code?: number;
  message?: string;
}

export interface UserData {
  success: boolean;
  code?: number;
  message?: string;
}

export interface LoginSuccessAction {
  type: 'LOGIN_SUCCESS';
  payload: LoginResponse; // Sesuaikan dengan tipe respons login Anda
}

export interface LoginFailureAction {
  type: 'LOGIN_FAILURE';
  payload: string;
}

export interface DataResponse {
  data: SetStateAction<any[]>;
  success: boolean;
  code?: number;
  message?: string;
  // data: any[];
}
