import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Vehicles = () => {
  const fleet = useContext(FleetContext);
  const [name, setName] = useState("");
  const [capacity, setCapacity] = useState(0);

  if (!fleet) return <div>Loading...</div>;
  const { vehicles, addVehicle, deleteVehicle } = fleet;

  const handleAddVehicle = async () => {
    if (!name || capacity <= 0) return;
    await addVehicle({ name, capacity, status: "Available" });
    setName(""); setCapacity(0);
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-primary">Vehicle Registry</h3>

      {/* Add Vehicle */}
      <div className="card p-3 mb-4 shadow-sm d-flex flex-wrap gap-2">
        <input
          className="form-control"
          placeholder="Vehicle Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="form-control"
          type="number"
          placeholder="Capacity (kg)"
          value={capacity}
          onChange={e => setCapacity(Number(e.target.value))}
        />
        <button className="btn btn-primary" onClick={handleAddVehicle}>Add Vehicle</button>
      </div>

      {/* Vehicles Table */}
      <div className="card p-3 shadow-sm table-responsive">
        {vehicles.length === 0 ? <p>No vehicles registered</p> : (
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Capacity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {vehicles.map(v => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.capacity} kg</td>
                  <td>
                    <span className={`badge ${
                      v.status === "Available" ? "bg-success" :
                      v.status === "In Shop" ? "bg-warning" :
                      "bg-info"
                    }`}>
                      {v.status}
                    </span>
                  </td>
                  <td>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteVehicle(v._id)}>Delete</button>
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