import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const roleRoutes: Record<string, string> = {
    Manager: "/dashboard",
    Dispatcher: "/trips",
    Safety: "/drivers",
    Finance: "/analytics",
  };

  useEffect(() => {
    if (user?.role) {
      navigate(roleRoutes[user.role]);
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      if (!email || !password) {
        setError("Please enter email and password");
        return;
      }

      await login({ email, password });
    } catch (err: any) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">
      <div className="login-container">

        {/* LEFT SIDE - LOGIN */}
        <div className="login-panel text-light">

          <h3 className="text-info fw-bold mb-3">FleetFlow Login</h3>

          {error && (
            <div className="alert alert-danger text-center py-2">
              {error}
            </div>
          )}

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control bg-dark text-light border-secondary"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            className="btn btn-info w-100 fw-semibold"
            onClick={handleLogin}
          >
            Login
          </button>

        </div>

        {/* RIGHT SIDE - REGISTER CTA */}
        <div className="register-panel text-center text-light d-flex flex-column justify-content-center">

          <h4 className="fw-bold mb-3">New Here?</h4>
          <p className="text-secondary">
            Create an account to manage fleet operations efficiently.
          </p>

          <Link to="/register">
            <button className="btn btn-outline-light mt-3 px-4">
              Create Account
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
};

export default Login;