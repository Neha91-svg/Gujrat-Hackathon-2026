import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/login";
import Register from "./pages/Register"; 
import Dashboard from "./pages/dashboard";
import Vehicles from "./pages/vehicles";
import Drivers from "./pages/drivers";
import Trips from "./pages/trips";
import Maintenance from "./pages/maintenance";
import Expenses from "./pages/expenses";
import Analytics from "./pages/analytics";
import Layout from "./components/layout";

function App() {
  const auth = useContext(AuthContext);

  // ✅ Role Protected Route Component
  const RoleProtectedRoute = ({
    children,
    allowedRoles,
  }: {
    children: React.ReactNode;
    allowedRoles: string[];
  }) => {
    if (!auth?.user?.role) return <Navigate to="/" replace />;
    if (!allowedRoles.includes(auth.user.role))
      return <Navigate to="/dashboard" replace />;
    return <>{children}</>;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* ================= PUBLIC ROUTES ================= */}
        <Route path="/" element={auth?.user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={auth?.user ? <Navigate to="/dashboard" /> : <Register />} />

        {/* ================= PROTECTED ROUTES ================= */}
        <Route
          path="/"
          element={auth?.user ? <Layout /> : <Navigate to="/" replace />}
        >
          <Route
            path="dashboard"
            element={
              <RoleProtectedRoute allowedRoles={["Manager", "Dispatcher", "Safety", "Finance"]}>
                <Dashboard />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="vehicles"
            element={
              <RoleProtectedRoute allowedRoles={["Manager", "Dispatcher"]}>
                <Vehicles />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="drivers"
            element={
              <RoleProtectedRoute allowedRoles={["Manager", "Safety"]}>
                <Drivers />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="trips"
            element={
              <RoleProtectedRoute allowedRoles={["Dispatcher"]}>
                <Trips />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="maintenance"
            element={
              <RoleProtectedRoute allowedRoles={["Manager"]}>
                <Maintenance />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="expenses"
            element={
              <RoleProtectedRoute allowedRoles={["Finance"]}>
                <Expenses />
              </RoleProtectedRoute>
            }
          />

          <Route
            path="analytics"
            element={
              <RoleProtectedRoute allowedRoles={["Manager", "Finance"]}>
                <Analytics />
              </RoleProtectedRoute>
            }
          />
        </Route>

        {/* Catch-all route */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;