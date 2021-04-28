import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL: string = 'https://vi-eco.jseung.me/api';

const initialConfig: AxiosRequestConfig = Object.freeze({ baseURL: API_BASE_URL });

const api = axios.create(initialConfig);

export default api;

// // TODO: If interceptors need to login, logout process or error handling...
// api.interceptors.response.use(
//   (result) => result,
//   async (error) => {
//     throw error;
//   },
// );
//
