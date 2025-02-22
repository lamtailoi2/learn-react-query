import axios, { AxiosError } from "axios";

export function isAxiosErrors<T>(error: unknown): error is AxiosError<T> {
  return axios.isAxiosError(error);
}
