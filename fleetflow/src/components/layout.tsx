import { Outlet, Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Layout = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth?.logout();
    navigate("/");
  };

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "250px",
          background: "#0f172a",
          color: "white",
          padding: "20px",
        }}
      >
        <h2>🚛 FleetFlow</h2>

        <nav style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
          <Link to="/dashboard" style={{ color: "white" }}>Dashboard</Link>
          <Link to="/vehicles" style={{ color: "white" }}>Vehicles</Link>
          <Link to="/drivers" style={{ color: "white" }}>Drivers</Link>
          <Link to="/trips" style={{ color: "white" }}>Trips</Link>
          <Link to="/maintenance" style={{ color: "white" }}>Maintenance</Link>
          <Link to="/expenses" style={{ color: "white" }}>Expenses</Link>
          <Link to="/analytics" style={{ color: "white" }}>Analytics</Link>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            marginTop: "30px",
            padding: "8px",
            background: "#ef4444",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ flex: 1, padding: "30px", background: "#f1f5f9" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;