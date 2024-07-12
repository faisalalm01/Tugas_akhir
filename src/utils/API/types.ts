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

export interface OtpVerif {
  success: boolean;
  code?: number;
  message?: string;
}

export interface UserData {
  success: boolean;
  code?: number;
  message?: string;
  data?: [];
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
  [x: string]: any;
  data: [];
  success: boolean;
  code?: number;
  message?: string;
  // data: any[];
}

export interface Image {
  uri: string;
  type: string;
  fileName: string;
}

export interface UserUpdateResponse {
  success: boolean;
  code?: number;
  message?: string;
  data?: [];
}

export interface inputCctvResponse {
  success: boolean;
  code?: number;
  message?: string;
  data?: [];
}

export interface inputLokasiResponse {
  success: boolean;
  code?: number;
  message?: string;
  data?: [];
}
