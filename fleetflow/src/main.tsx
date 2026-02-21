import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./theme.css";
import { AuthProvider } from "./context/AuthContext";
import { FleetProvider } from "./context/FleetContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <FleetProvider>
        <App />
      </FleetProvider>
    </AuthProvider>
  </React.StrictMode>
);