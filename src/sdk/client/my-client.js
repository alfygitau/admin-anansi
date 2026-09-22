import axios from "axios";
import * as Sentry from "@sentry/react";

function httpClient(baseURL) {
  const baseClient = axios.create({
    baseURL,
    timeout: 60000,
  });

  // REQUEST INTERCEPTOR
  baseClient.interceptors.request.use((request) => {
    const authData = localStorage?.getItem("auth");
    let parsed = null;

    try {
      parsed = authData ? JSON?.parse(authData) : null;
    } catch {
      localStorage?.removeItem("auth");
    }

    const accessToken = parsed?.tokens?.accessToken;
    const user = parsed?.user;

    // Attach user profile context to Sentry scope on active requests
    if (user) {
      Sentry.setUser({
        id: user.id || user._id,
        email: user.email,
        username: user.username,
      });
    } else {
      Sentry.setUser(null);
    }

    if (accessToken) {
      request.headers.Authorization = `Bearer ${accessToken}`;
    }

    return request;
  });

  // RESPONSE INTERCEPTOR
  baseClient.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === 401) {
        Sentry.setUser(null);
        window.location.href = "/";
      } else if (error?.response?.status >= 400) {
        // Send network error details to Sentry
        Sentry.captureException(error, {
          extra: {
            url: error.config?.url,
            status: error.response?.status,
            data: error.response?.data,
          },
        });
      }
      return Promise.reject(error);
    },
  );

  return baseClient;
}

export const myClient = httpClient(process.env.REACT_APP_API_URL);
