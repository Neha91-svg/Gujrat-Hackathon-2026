import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("Manager");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  // Role → Default Landing Page Map
  const roleRoutes: Record<string, string> = {
    Manager: "/dashboard",
    Dispatcher: "/trips",
    Safety: "/drivers",
    Finance: "/analytics",
  };

  // Auto redirect if already logged in
  useEffect(() => {
    if (auth?.role) {
      navigate(roleRoutes[auth.role]);
    }
  }, [auth, navigate]);

  const handleLogin = () => {
    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setError("");

    auth?.login(role);

    if (remember) {
      localStorage.setItem(
        "fleetflowUser",
        JSON.stringify({ email, role })
      );
    }

    navigate(roleRoutes[role]);
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">

      <div className="glass-card text-light">

        {/* Header */}
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995470.png"
            alt="logo"
            width="60"
            className="mb-3"
          />
          <h3 className="text-info fw-bold">FleetFlow</h3>
          <small className="text-secondary">
            Smart Fleet Management System
          </small>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="alert alert-danger py-2 text-center">
            {error}
          </div>
        )}

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control bg-dark text-light border-secondary"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Role Dropdown */}
        <div className="mb-3">
          <label className="form-label">Select Role</label>
          <select
            className="form-select bg-dark text-light border-secondary"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="Manager">Fleet Manager</option>
            <option value="Dispatcher">Dispatcher</option>
            <option value="Safety">Safety Officer</option>
            <option value="Finance">Financial Analyst</option>
          </select>
        </div>

        {/* Remember Me */}
        <div className="form-check mb-3">
          <input
            type="checkbox"
            className="form-check-input"
            checked={remember}
            onChange={() => setRemember(!remember)}
            id="rememberCheck"
          />
          <label className="form-check-label" htmlFor="rememberCheck">
            Remember me
          </label>
        </div>

        {/* Login Button */}
        <button
          className="btn btn-info w-100 fw-semibold"
          onClick={handleLogin}
        >
          Login
        </button>

        {/* Footer */}
        <div className="text-center mt-4">
          <small className="text-secondary">
            © 2026 FleetFlow Logistics
          </small>
        </div>

      </div>
    </div>
  );
};

export default Login;