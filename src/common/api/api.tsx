import axios, { AxiosRequestConfig } from 'axios';

const API_BASE_URL: string = 'http://ec2-3-36-231-201.ap-northeast-2.compute.amazonaws.com:8080/api';

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
