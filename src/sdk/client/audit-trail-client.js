import axios from "axios";

const apiUrl = process.env.REACT_APP_API_AUDIT_BASE_URL;
export const auditClient = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
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

      // 2. Redirect the user to the login page
      // Using window.location.href is the most reliable way outside of a React component
      window.location.href = "/auth/login";
    }

    return Promise.reject(error);
  },
);
