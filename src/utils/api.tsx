import axios, { AxiosError } from "axios";

// Configuração básica do axios
export const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 40 * 1000,
});

export const setupBasicAuth = (username: string, password: string) => {
  const token = btoa(`${username}:${password}`);
  api.interceptors.request.use((config) => {
    config.headers.Authorization = `Basic ${token}`;
    return config;
  });
};

export function isAxiosError(candidate: any): candidate is AxiosError {
  return candidate.isAxiosError === true;
}
