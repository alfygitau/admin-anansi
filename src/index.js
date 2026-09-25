import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./styles/variable.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ToastProvider } from "./contexts/ToastProvider";
import { AuthProvider } from "./contexts/AuthProvider";
import * as Sentry from "@sentry/react";

const root = ReactDOM.createRoot(document.getElementById("root"));

console.log(process.env.REACT_APP_SentryDNS)

Sentry.init({
  dsn: process.env.REACT_APP_SentryDNS,
  debug: true,
  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["error", "warn"],
    }),
    Sentry.dedupeIntegration({ enabled: false }),
  ],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: true,
    },
  },
});

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ToastProvider>
        <QueryClientProvider client={queryClient}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </ToastProvider>
    </AuthProvider>
  </React.StrictMode>,
);
