import axios, { AxiosError } from "axios";
import { BaseQueryFn } from "@reduxjs/toolkit/query";
import { AxiosRequestConfig } from "axios";

/**
 * Декоратор для запросов [rtk-query](https://redux-toolkit.js.org/rtk-query/usage/customizing-queries) через axios
 *
 * @param {AxiosRequestConfig} customConfig - конфиг библиотеки axios
 * @returns {BaseQueryFn}
 */
export const axiosBaseQuery =
  (
    config?: AxiosRequestConfig
  ): BaseQueryFn<AxiosRequestConfig, unknown, AxiosError> =>
  async (request) => {
    try {
      const result = await axios({
        timeout: 10000,
        ...config,
        ...request,
        headers: {
          ...config?.headers,
          ...request.headers,
        },
      });

      return { data: result.data };
    } catch (error) {
      return {
        error: error as AxiosError,
      };
    }
  };
