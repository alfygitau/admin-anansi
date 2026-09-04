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

Sentry.init({
  dsn: "https://1c0d555310c965e0b9a66e305bbda950@o4508850577604609.ingest.de.sentry.io/4512023115661392",

  integrations: [
    Sentry.captureConsoleIntegration({
      levels: ["error", "warn"],
    }),
  ],
});

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
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
