import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import nprogress from 'nprogress';

const BASE_URL = process.env.REACT_APP_API_URL;

export const axiosInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    nprogress.start();
    return config;
  },
  (error: AxiosError) => {
    nprogress.done();
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    nprogress.done();
    return response;
  },
  (error: AxiosError) => {
    nprogress.done();
    return Promise.reject(handleResponseWithError(error));
  }
);

function handleResponseWithError(error: AxiosError) {
  const errorCodes = [404, 500];
  const responseCode = Number(error?.code || 0);
  const msgError = errorCodes.includes(responseCode)
    ? 'Houve um problema com a chamada na API'
    : 'Ocorreu um problema desconhecido';
  //   toast.error(msgError);
  return error;
}

export const API = {
  get<TResponse, TParams = any>(
    endpoint: string,
    params?: TParams
  ): Promise<AxiosResponse<TResponse>> {
    return axiosInstance.get<TResponse>(endpoint, { params });
  },
  post<TResponse, TPayload>(
    endpoint: string,
    payload: TPayload
  ): Promise<AxiosResponse<TResponse>> {
    return axiosInstance.post<any, AxiosResponse<TResponse>>(
      endpoint,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  },
  delete<TResponse>(
    endpoint: string,
    id: number
  ): Promise<AxiosResponse<TResponse>> {
    return axiosInstance.delete(`${endpoint}/${id}`);
  },
  put<TResponse, TPayload>(
    endpoint: string,
    payload: TPayload
  ): Promise<AxiosResponse<TResponse>> {
    return axiosInstance.put(endpoint, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },
  all<TResponse>(requests: any[]): Promise<TResponse[]> {
    return Promise.all(requests);
  },
};

export default API;
