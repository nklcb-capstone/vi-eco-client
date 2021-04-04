import axios from 'axios';

const datagokrApi = axios.create({
  baseURL: 'http://apis.data.go.kr/B552584',
  timeout: 0,
  params: {
    serviceKey: 'BHsquG%2FvorGlzWqsqkFMoOYe5hAUjnunPhlWdwb3CILZ2xuTDoNGD2R1E81gl7Lzmtq3n2cCYW11YUqQGVlUWA%3D%3D',
  },
});

export default datagokrApi;
