import { useContext } from "react";
import { FleetContext } from "../context/FleetContext";

const Analytics = () => {
  const fleet = useContext(FleetContext);
  if (!fleet) return <div>Loading...</div>;

  const { vehicles, drivers, trips, expenses } = fleet;

  const totalVehicles = vehicles.length;
  const availableVehicles = vehicles.filter(v => v.status === "Available").length;
  const inMaintenance = vehicles.filter(v => v.status === "In Shop").length;
  const onTrip = vehicles.filter(v => v.status === "On Trip").length;

  const activeDrivers = drivers.filter(d => d.status === "Active").length;
  const suspendedDrivers = drivers.filter(d => d.status === "Suspended").length;

  const completedTrips = trips.filter(t => t.status === "Completed").length;
  const dispatchedTrips = trips.filter(t => t.status === "Dispatched").length;

  const totalExpense = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-primary">Analytics</h3>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Vehicles</h6>
            <h4>{totalVehicles}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Available</h6>
            <h4 className="text-success">{availableVehicles}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>On Trip</h6>
            <h4 className="text-warning">{onTrip}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card p-3 shadow-sm">
            <h6>Maintenance</h6>
            <h4 className="text-danger">{inMaintenance}</h4>
          </div>
        </div>

        <div className="col-md-3 mt-3">
          <div className="card p-3 shadow-sm">
            <h6>Active Drivers</h6>
            <h4 className="text-success">{activeDrivers}</h4>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="card p-3 shadow-sm">
            <h6>Suspended Drivers</h6>
            <h4 className="text-danger">{suspendedDrivers}</h4>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="card p-3 shadow-sm">
            <h6>Completed Trips</h6>
            <h4 className="text-success">{completedTrips}</h4>
          </div>
        </div>
        <div className="col-md-3 mt-3">
          <div className="card p-3 shadow-sm">
            <h6>Dispatched Trips</h6>
            <h4 className="text-warning">{dispatchedTrips}</h4>
          </div>
        </div>

        <div className="col-12 mt-3">
          <div className="card p-3 shadow-sm">
            <h6>Total Expenses</h6>
            <h4 className="text-danger">₹ {totalExpense.toLocaleString()}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;