import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";
import type { Vehicle } from "../context/FleetContext";

const Vehicles = () => {
  const fleet = useContext(FleetContext);

  if (!fleet) {
    return <div className="text-light p-4">Loading...</div>;
  }

  const { vehicles, addVehicle, deleteVehicle } = fleet;

  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState<number>(0);

  const handleAdd = () => {
    if (!name || capacity <= 0) return;

    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name,
      capacity,
      status: "Available",
    };

    addVehicle(newVehicle);

    setName("");
    setCapacity(0);
  };

  return (
    <div>

      {/* HEADER */}
      <div className="mb-4">
        <h3 className="fw-semibold">Vehicle Registry</h3>
        <small className="text-muted">
          Add and manage fleet vehicles
        </small>
      </div>

      {/* ADD FORM */}
      <div className="dashboard-card mb-4">
        <div className="row g-3">

          <div className="col-md-5">
            <input
              type="text"
              className="form-control"
              placeholder="Vehicle Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Capacity (kg)"
              value={capacity}
              onChange={(e) =>
                setCapacity(Number(e.target.value))
              }
            />
          </div>

          <div className="col-md-3">
            <button
              className="btn btn-info w-100"
              onClick={handleAdd}
            >
              Add Vehicle
            </button>
          </div>

        </div>
      </div>

      {/* VEHICLE TABLE */}
      <div className="dashboard-card">
        {vehicles.length === 0 ? (
          <p className="text-muted">No vehicles added yet.</p>
        ) : (
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map((v) => (
                <tr key={v.id}>
                  <td>{v.name}</td>
                  <td>{v.capacity} kg</td>
                  <td>
                    <span
                      className={`badge ${
                        v.status === "Available"
                          ? "bg-success"
                          : v.status === "On Trip"
                          ? "bg-info"
                          : "bg-warning"
                      }`}
                    >
                      {v.status}
                    </span>
                  </td>
                  <td className="text-end">
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() =>
                        deleteVehicle(v.id)
                      }
                    >
                      Delete
                    </button>
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

export default Vehicles;