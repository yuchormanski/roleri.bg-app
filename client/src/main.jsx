import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundaryPage from "./pages/errorBoundary/ErrorBoundaryPage.jsx";
// import { ErrorBoundary } from "./guards/ErrorBoundary.jsx";

import "./css/index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorBoundaryPage}>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);
