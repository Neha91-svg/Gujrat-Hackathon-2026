import { useContext } from "react";
import { FleetContext } from "../context/FleetContext";

const Dashboard = () => {
  const fleet = useContext(FleetContext);
  if (!fleet) return <div>Loading...</div>;

  const totalVehicles = fleet.vehicles.length;
  const available = fleet.vehicles.filter(v => v.status === "Available").length;
  const onTrip = fleet.vehicles.filter(v => v.status === "On Trip").length;
  const inMaintenance = fleet.vehicles.filter(v => v.status === "In Shop").length;

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-primary">Command Center</h3>
      <div className="row g-4">
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 bg-light rounded">
            <h6>Total Vehicles</h6>
            <h4>{totalVehicles}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 bg-light rounded">
            <h6>Available</h6>
            <h4 className="text-success">{available}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 bg-light rounded">
            <h6>On Trip</h6>
            <h4 className="text-warning">{onTrip}</h4>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-center shadow-sm p-3 bg-light rounded">
            <h6>In Maintenance</h6>
            <h4 className="text-danger">{inMaintenance}</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;