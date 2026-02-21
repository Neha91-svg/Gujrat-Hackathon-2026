import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Vehicles from "./pages/Vehicles";
import Drivers from "./pages/Drivers";
import Trips from "./pages/Trips";
import Maintenance from "./pages/Maintenance";
import Expenses from "./pages/Expenses";
import Analytics from "./pages/Analytics";
import Layout from "./components/Layout";

function App() {
  const auth = useContext(AuthContext);

  const RoleProtectedRoute = ({
    children,
    allowedRoles,
  }: {
    children: JSX.Element;
    allowedRoles: string[];
  }) => {
    if (!auth?.role) return <Navigate to="/" replace />;
    if (!allowedRoles.includes(auth.role))
      return <Navigate to="/dashboard" replace />;
    return children;
  };

  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route path="/" element={<Login />} />

        {/* PROTECTED ROUTES */}
        <Route
          path="/"
          element={auth?.role ? <Layout /> : <Navigate to="/" replace />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vehicles" element={<Vehicles />} />
          <Route path="drivers" element={<Drivers />} />
          <Route path="trips" element={<Trips />} />
          <Route path="maintenance" element={<Maintenance />} />
          <Route path="expenses" element={<Expenses />} />
          <Route path="analytics" element={<Analytics />} />
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;