import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Trips = () => {
  const fleet = useContext(FleetContext);

  const [vehicleId, setVehicleId] = useState("");
  const [driverId, setDriverId] = useState("");
  const [cargoWeight, setCargoWeight] = useState("");

  if (!fleet) return null;

  const availableVehicles = fleet.vehicles.filter(
    (v) => v.status === "Available"
  );

  const activeDrivers = fleet.drivers.filter(
    (d) => d.status === "Active"
  );

  const handleCreateTrip = () => {
    if (!vehicleId || !driverId || !cargoWeight) return;

    const newTrip = {
      id: Date.now().toString(),
      vehicleId,
      driverId,
      cargoWeight: Number(cargoWeight),
      status: "Dispatched" as const,
    };

    fleet.addTrip(newTrip);

    // update vehicle status
    fleet.vehicles.forEach((v) => {
      if (v.id === vehicleId) {
        v.status = "On Trip";
      }
    });

    setVehicleId("");
    setDriverId("");
    setCargoWeight("");
  };

  const completeTrip = (id: string, vehicleId: string) => {
    fleet.trips.forEach((t) => {
      if (t.id === id) {
        t.status = "Completed";
      }
    });

    fleet.vehicles.forEach((v) => {
      if (v.id === vehicleId) {
        v.status = "Available";
      }
    });
  };

  return (
    <div>
      <h3 className="mb-4">Dispatch Center</h3>

      {/* CREATE TRIP */}
      <div className="dashboard-card mb-4">
        <h5 className="mb-3">Create New Trip</h5>

        <div className="row g-3">
          <div className="col-md-4">
            <select
              className="form-select"
              value={vehicleId}
              onChange={(e) => setVehicleId(e.target.value)}
            >
              <option value="">Select Vehicle</option>
              {availableVehicles.map((v) => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-4">
            <select
              className="form-select"
              value={driverId}
              onChange={(e) => setDriverId(e.target.value)}
            >
              <option value="">Select Driver</option>
              {activeDrivers.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-3">
            <input
              type="number"
              placeholder="Cargo Weight (kg)"
              className="form-control"
              value={cargoWeight}
              onChange={(e) => setCargoWeight(e.target.value)}
            />
          </div>

          <div className="col-md-1">
            <button
              className="btn btn-info w-100"
              onClick={handleCreateTrip}
            >
              Go
            </button>
          </div>
        </div>
      </div>

      {/* ACTIVE TRIPS */}
      <div className="dashboard-card">
        <h5 className="mb-3">Active Trips</h5>

        {fleet.trips.length === 0 ? (
          <p className="text-muted">No active trips</p>
        ) : (
          <table className="table table-dark table-hover">
            <thead>
              <tr>
                <th>Vehicle</th>
                <th>Driver</th>
                <th>Cargo</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {fleet.trips.map((trip) => {
                const vehicle = fleet.vehicles.find(
                  (v) => v.id === trip.vehicleId
                );
                const driver = fleet.drivers.find(
                  (d) => d.id === trip.driverId
                );

                return (
                  <tr key={trip.id}>
                    <td>{vehicle?.name}</td>
                    <td>{driver?.name}</td>
                    <td>{trip.cargoWeight} kg</td>
                    <td>
                      <span className="badge bg-info">
                        {trip.status}
                      </span>
                    </td>
                    <td>
                      {trip.status === "Dispatched" && (
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() =>
                            completeTrip(trip.id, trip.vehicleId)
                          }
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Trips;