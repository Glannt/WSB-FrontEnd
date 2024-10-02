import { HttpStatusCode } from '@/constants/httpStatusCode.enum';
import { AuthResponse } from '@/types/auth.type';
import axios, { type AxiosInstance } from 'axios';
import { toast } from 'react-toastify';
import path from '@/constants/path';

import {
  clearLS,
  getAccessTokenFromLS,
  saveAccessTokenToLS,
  setProfileToLS,
  setRoleNameToLS,
} from './auth';
import { omit } from 'lodash';
import { User } from '@/types/user.type';

class Http {
  instance: AxiosInstance;
  private accessToken;
  constructor() {
    this.accessToken = getAccessTokenFromLS();
    this.instance = axios.create({
      baseURL: 'http://localhost:8080',
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    this.instance.interceptors.request.use(
      (config) => {
        this.accessToken = getAccessTokenFromLS();
        if (this.accessToken) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;
          console.log(config.headers.Authorization);

          return config;
        }
        if (this.accessToken && config.headers) {
          config.headers.Authorization = `Bearer ${this.accessToken}`;

          // config.headers['Authorization'] = `Bearer ${this.accessToken}`;
          // console.log(config.headers['Authorization']);

          return config;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use(
      (response) => {
        const { url } = response.config;
        // console.log(url);

        if (url === path.authLogin || url === path.authRegister) {
          // this.accessToken = (response.data as AuthResponse).data.access_token;
          this.accessToken = response.data.access_token;
          console.log(response.data as AuthResponse);
          console.log(response.data.data);

          const user = omit(response.data.data, ['password']);
          // setProfileToLS(user);
          saveAccessTokenToLS(this.accessToken);
          setProfileToLS(response.data.data);
          setRoleNameToLS(response.data.data.roleName);
        } else if (url === path.logout) {
          this.accessToken = '';
          clearLS();
        }
        toast.success(response.data.message, {
          autoClose: 3000,
        });
        return response;
      },
      function (error) {
        console.log(error);
        if (error.response?.status !== HttpStatusCode.UnprocessableEntity) {
          const data: any | undefined = error.response?.data;
          const message = data.message || error.message;
          toast.error(data.message);
        }
        return Promise.reject(error);
      }
    );
  }
}

const http = new Http().instance;
export default http;
