import axios from "axios";
import * as Sentry from "@sentry/react";

const apiUrl = process.env.REACT_APP_API_AUDIT_BASE_URL;
export const auditClient = axios.create({
  baseURL: apiUrl,
  withCredentials: true,
});

// REQUEST INTERCEPTOR
auditClient.interceptors.request.use(
  (request) => {
    const authData = localStorage.getItem("auth");
    const parsed = authData ? JSON.parse(authData) : null;
    const accessToken = parsed?.tokens?.accessToken;
    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

auditClient.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Check if the error is a 401 (Unauthorized)
    if (error.response && error.response.status === 401) {
      // 1. Clear the expired data from local storage
      localStorage.removeItem("auth");

      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);

auditClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const method = error.config?.method?.toUpperCase() || "UNKNOWN";
    const url = error.config?.url || "UNKNOWN_URL";

    Sentry.captureMessage(`Interceptor Triggered: ${method} ${url}`);

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
