import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Trips = () => {
  const fleet = useContext(FleetContext);
  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");

  if (!fleet) return <div>Loading...</div>;

  const availableVehicles = fleet.vehicles.filter(v => v.status === "Available");
  const activeDrivers = fleet.drivers.filter(d => d.status === "Active");

  const handleCreateTrip = async () => {
    if (!vehicleId || !driverId || !cargoWeight) return;
    await fleet.addTrip({ vehicleId, driverId, cargoWeight: Number(cargoWeight) });
    setVehicleId(""); setDriverId(""); setCargoWeight("");
  };

  const handleCompleteTrip = async (tripId: string) => {
    await fleet.completeTrip(tripId);
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-primary">Dispatch Center</h3>

      {/* Create Trip */}
      <div className="card p-3 mb-4 shadow-sm d-flex flex-wrap gap-2">
        <select className="form-select" value={vehicleId} onChange={e => setVehicleId(e.target.value)}>
          <option value="">Select Vehicle</option>
          {availableVehicles.map(v => <option key={v._id} value={v._id}>{v.name}</option>)}
        </select>

        <select className="form-select" value={driverId} onChange={e => setDriverId(e.target.value)}>
          <option value="">Select Driver</option>
          {activeDrivers.map(d => <option key={d._id} value={d._id}>{d.name}</option>)}
        </select>

        <input
          className="form-control"
          type="number"
          placeholder="Cargo Weight"
          value={cargoWeight}
          onChange={e => setCargoWeight(e.target.value)}
        />

        <button className="btn btn-primary" onClick={handleCreateTrip}>Create Trip</button>
      </div>

      {/* Trips Table */}
      <div className="card p-3 shadow-sm table-responsive">
        {fleet.trips.length === 0 ? <p>No trips scheduled</p> : (
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Cargo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fleet.trips.map(trip => (
                <tr key={trip._id}>
                  <td>{fleet.vehicles.find(v => v._id === trip.vehicleId)?.name}</td>
                  <td>{fleet.drivers.find(d => d._id === trip.driverId)?.name}</td>
                  <td>{trip.cargoWeight}</td>
                  <td>
                    <span className={`badge ${
                      trip.status === "Dispatched" ? "bg-warning" : "bg-success"
                    }`}>{trip.status}</span>
                  </td>
                  <td>
                    {trip.status === "Dispatched" && (
                      <button className="btn btn-sm btn-success" onClick={() => handleCompleteTrip(trip._id)}>Complete</button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Trips;