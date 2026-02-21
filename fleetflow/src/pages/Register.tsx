import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

type Role = "Manager" | "Dispatcher" | "Safety" | "Finance";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("Manager");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        setError("All fields are required");
        return;
      }

      await register({ name, email, password, role });

      alert("Registration successful!");
      navigate("/");

    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="login-bg d-flex justify-content-center align-items-center">
      <div className="glass-card text-light">

        <h3 className="text-info text-center mb-4">
          FleetFlow Registration
        </h3>

        {error && (
          <div className="alert alert-danger text-center">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label>Full Name</label>
          <input
            className="form-control bg-dark text-light"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Email</label>
          <input
            className="form-control bg-dark text-light"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control bg-dark text-light"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label>Select Role</label>
          <select
            className="form-select bg-dark text-light"
            value={role}
            onChange={(e) => setRole(e.target.value as Role)}
          >
            <option value="Manager">Fleet Manager</option>
            <option value="Dispatcher">Dispatcher</option>
            <option value="Safety">Safety Officer</option>
            <option value="Finance">Financial Analyst</option>
          </select>
        </div>

        <button
          className="btn btn-info w-100"
          onClick={handleRegister}
        >
          Register
        </button>

        <div className="text-center mt-3">
          <small>
            Already have an account?{" "}
            <Link to="/" className="text-info">
              Login
            </Link>
          </small>
        </div>

      </div>
    </div>
  );
};

export default Register;