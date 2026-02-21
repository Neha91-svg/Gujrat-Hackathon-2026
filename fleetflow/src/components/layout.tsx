import { Outlet, NavLink } from "react-router-dom";

const Layout = () => {
  return (
    <div className="container-fluid">
      <div className="row">

        {/* Sidebar */}
        <div className="col-2 sidebar">
          <h4 className="mb-4 text-info">FleetFlow</h4>

          <NavLink to="/dashboard">Command Center</NavLink>
          <NavLink to="/vehicles">Vehicle Registry</NavLink>
          <NavLink to="/trips">Dispatch</NavLink>
          <NavLink to="/maintenance">Maintenance</NavLink>
          <NavLink to="/drivers">Drivers</NavLink>
          <NavLink to="/analytics">Analytics</NavLink>
        </div>

        {/* Main Content */}
        <div className="col-10">
          <div className="top-header">
            <h2>Command Center</h2>
            <p className="text-muted">
              High-level fleet oversight and operational metrics.
            </p>
          </div>

          <div className="p-4">
            <Outlet />
          </div>
        </div>

      </div>
    </div>
  );
};

export default Layout;