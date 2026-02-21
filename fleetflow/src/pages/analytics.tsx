import { useContext } from "react";
import { FleetContext } from "../context/FleetContext";

const Analytics = () => {
  const fleet = useContext(FleetContext);

  if (!fleet) return <div>Loading...</div>;

  const { vehicles, drivers, trips, expenses } = fleet;

  // VEHICLE DATA
  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(
    (v) => v.status === "Available"
  ).length;
  const inMaintenance = vehicles.filter(
    (v) => v.status === "In Shop"
  ).length;
  const onTrip = vehicles.filter(
    (v) => v.status === "On Trip"
  ).length;

  // DRIVER DATA
  const activeDrivers = drivers.filter(
    (d) => d.status === "Active"
  ).length;
  const suspendedDrivers = drivers.filter(
    (d) => d.status === "Suspended"
  ).length;

  // TRIP DATA
  const completedTrips = trips.filter(
    (t) => t.status === "Completed"
  ).length;
  const dispatchedTrips = trips.filter(
    (t) => t.status === "Dispatched"
  ).length;

  // EXPENSE DATA
  const totalExpense = expenses.reduce(
    (sum, e) => sum + e.amount,
    0
  );

  return (
    <div>

      <h3 className="mb-4">System Analytics</h3>

      {/* KPI ROW */}
      <div className="row g-4 mb-5">

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Total Vehicles</h6>
            <div className="stat-number text-info">
              {totalVehicles}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Active Drivers</h6>
            <div className="stat-number text-success">
              {activeDrivers}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Completed Trips</h6>
            <div className="stat-number text-primary">
              {completedTrips}
            </div>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card">
            <h6>Total Expenses</h6>
            <div className="stat-number text-danger">
              ₹ {totalExpense}
            </div>
          </div>
        </div>

      </div>

      {/* DISTRIBUTION SECTION */}
      <div className="row g-4">

        {/* Vehicle Status */}
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-3">Vehicle Status</h5>

            <p>Available: {availableVehicles}</p>
            <div className="progress mb-3">
              <div
                className="progress-bar bg-success"
                style={{
                  width: totalVehicles
                    ? `${(availableVehicles / totalVehicles) * 100}%`
                    : "0%",
                }}
              />
            </div>

            <p>On Trip: {onTrip}</p>
            <div className="progress mb-3">
              <div
                className="progress-bar bg-info"
                style={{
                  width: totalVehicles
                    ? `${(onTrip / totalVehicles) * 100}%`
                    : "0%",
                }}
              />
            </div>

            <p>Maintenance: {inMaintenance}</p>
            <div className="progress">
              <div
                className="progress-bar bg-warning"
                style={{
                  width: totalVehicles
                    ? `${(inMaintenance / totalVehicles) * 100}%`
                    : "0%",
                }}
              />
            </div>

          </div>
        </div>

        {/* Driver & Trip Summary */}
        <div className="col-md-6">
          <div className="dashboard-card">
            <h5 className="mb-3">Operations Overview</h5>

            <ul className="list-group list-group-flush bg-transparent">
              <li className="list-group-item bg-transparent text-light border-secondary">
                Active Drivers: {activeDrivers}
              </li>
              <li className="list-group-item bg-transparent text-light border-secondary">
                Suspended Drivers: {suspendedDrivers}
              </li>
              <li className="list-group-item bg-transparent text-light border-secondary">
                Dispatched Trips: {dispatchedTrips}
              </li>
              <li className="list-group-item bg-transparent text-light border-secondary">
                Completed Trips: {completedTrips}
              </li>
            </ul>

          </div>
        </div>

      </div>

    </div>
  );
};

export default Analytics;