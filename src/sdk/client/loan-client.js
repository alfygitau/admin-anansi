import axios from "axios";
import { client } from "./client";
import * as Sentry from "@sentry/react";

const apiUrl = process.env.REACT_APP_LOAN_BASE_URL;
const apiKey = process.env.REACT_APP_API_KEY;

export const loanClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "X-API-Key": apiKey,
    "Content-Type": "application/json",
  },
});

loanClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("auth");
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);

loanClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const method = error.config?.method?.toUpperCase() || "UNKNOWN";
    const url = error.config?.url || "UNKNOWN_URL";

    Sentry.captureException(error, {
      tags: {
        endpoint: url,
        method,
        status: status || "NETWORK_ERROR",
      },
      extra: {
        responseData: error.response?.data,
        params: error.config?.params,
      },
    });

    return Promise.reject(error);
  },
);
