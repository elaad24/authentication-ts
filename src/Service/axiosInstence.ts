import axios, { AxiosError, AxiosResponse } from "axios";

const api = axios.create({
  baseURL: "http://localhost:5090",
  withCredentials: true,
});

interface ErrorResponseData {
  redirect?: string;
}

api.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  async (error: AxiosError<ErrorResponseData>): Promise<any> => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      if (error.response.data?.redirect)
        window.location.replace(error.response.data?.redirect);
    }
  }
);

export default api;
