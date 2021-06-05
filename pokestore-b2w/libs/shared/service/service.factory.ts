import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios';
import nprogress from 'nprogress';
import { toast } from 'react-toastify';
import { from, Observable, zip } from 'rxjs';

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
  toast.error(msgError);
  return error;
}

export const API = {
  get<TResponse, TParams = any>(endpoint: string, params?: TParams): Observable<AxiosResponse<TResponse>> {
    return from(
      axiosInstance.get<TResponse>(endpoint, { params })
    );
  },

  post<TResponse, TPayload>(endpoint: string, payload: TPayload): Observable<AxiosResponse<TResponse>> {
    return from(
      axiosInstance.post<any, AxiosResponse<TResponse>>(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  },

  delete<TResponse>(endpoint: string, id: number): Observable<AxiosResponse<TResponse>> {
    return from(axiosInstance.delete(`${endpoint}/${id}`));
  },

  put<TResponse, TPayload>(endpoint: string, payload: TPayload): Observable<AxiosResponse<TResponse>> {
    return from(
      axiosInstance.put(endpoint, payload, {
        headers: {
          'Content-Type': 'application/json',
        },
      })
    );
  },

  all<TResponse>(requests: any): Observable<AxiosResponse<TResponse>[]> {
    return zip<AxiosResponse<TResponse>[]>(requests);
  },
};

export default API;
