import { useContext } from "react";
import { FleetContext } from "../context/FleetContext";

const Dashboard = () => {
  const fleet = useContext(FleetContext);

  const totalVehicles = fleet?.vehicles.length || 0;
  const activeVehicles =
    fleet?.vehicles.filter(v => v.status === "On Trip").length || 0;
  const maintenance =
    fleet?.vehicles.filter(v => v.status === "In Shop").length || 0;
  const available =
    fleet?.vehicles.filter(v => v.status === "Available").length || 0;

  return (
    <div>

      {/* HEADER */}
      <div className="mb-5">
        <h3 className="fw-bold text-light">Command Center</h3>
        <small className="text-info">
          Real-time fleet operational overview
        </small>
      </div>

      {/* KPI CARDS */}
      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="dashboard-card shadow-sm">
            <h6 className="text-muted">Total Fleet</h6>
            <div className="stat-number text-info">
              {totalVehicles}
            </div>
            <small className="text-muted">All registered vehicles</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card shadow-sm">
            <h6 className="text-muted">Active Trips</h6>
            <div className="stat-number text-success">
              {activeVehicles}
            </div>
            <small className="text-success">Currently dispatched</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card shadow-sm">
            <h6 className="text-muted">In Maintenance</h6>
            <div className="stat-number text-warning">
              {maintenance}
            </div>
            <small className="text-warning">Needs attention</small>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card shadow-sm">
            <h6 className="text-muted">Available Fleet</h6>
            <div className="stat-number text-primary">
              {available}
            </div>
            <small className="text-muted">Ready for dispatch</small>
          </div>
        </div>

      </div>

      {/* STATUS + ACTIVITY */}
      <div className="row g-4">

        {/* Fleet Distribution */}
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-4 text-info">Fleet Distribution</h5>

            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <small>Available</small>
                <small className="text-success">{available}</small>
              </div>
              <div className="progress mt-2 bg-dark">
                <div
                  className="progress-bar bg-success"
                  style={{
                    width: totalVehicles
                      ? `${(available / totalVehicles) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>

            <div className="mb-4">
              <div className="d-flex justify-content-between">
                <small>On Trip</small>
                <small className="text-info">{activeVehicles}</small>
              </div>
              <div className="progress mt-2 bg-dark">
                <div
                  className="progress-bar bg-info"
                  style={{
                    width: totalVehicles
                      ? `${(activeVehicles / totalVehicles) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between">
                <small>Maintenance</small>
                <small className="text-warning">{maintenance}</small>
              </div>
              <div className="progress mt-2 bg-dark">
                <div
                  className="progress-bar bg-warning"
                  style={{
                    width: totalVehicles
                      ? `${(maintenance / totalVehicles) * 100}%`
                      : "0%",
                  }}
                />
              </div>
            </div>

          </div>
        </div>

        {/* Recent Activity */}
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-4 text-info">Recent Activity</h5>

            <div className="p-3 rounded bg-dark border border-secondary mb-3">
              🚚 Vehicle dispatched successfully
            </div>

            <div className="p-3 rounded bg-dark border border-secondary mb-3">
              🛠 Maintenance scheduled
            </div>

            <div className="p-3 rounded bg-dark border border-secondary mb-3">
              👨‍✈️ Driver status updated
            </div>

            <div className="p-3 rounded bg-dark border border-secondary">
              📦 Cargo assigned
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Dashboard;