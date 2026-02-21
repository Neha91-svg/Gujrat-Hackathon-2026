import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Maintenance = () => {
  const fleet = useContext(FleetContext);
  const [selectedId, setSelectedId] = useState("");

  if (!fleet) return <div>Loading...</div>;

  const { vehicles, updateVehicleStatus } = fleet;

  const availableVehicles = vehicles.filter(v => v.status === "Available");
  const maintenanceVehicles = vehicles.filter(v => v.status === "In Shop");

  const sendToMaintenance = async () => {
    if (!selectedId) return;
    await updateVehicleStatus(selectedId, "In Shop");
    setSelectedId("");
  };

  const completeMaintenance = async (id: string) => {
    await updateVehicleStatus(id, "Available");
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-primary">Maintenance Center</h3>

      {/* Send to Maintenance */}
      <div className="card p-3 mb-4 shadow-sm d-flex flex-wrap gap-2">
        <select className="form-select flex-grow-1" value={selectedId} onChange={e => setSelectedId(e.target.value)}>
          <option value="">Select Vehicle</option>
          {availableVehicles.map(v => <option key={v._id} value={v._id}>{v.name} ({v.capacity} kg)</option>)}
        </select>
        <button className="btn btn-warning" onClick={sendToMaintenance} disabled={!selectedId}>Move to Maintenance</button>
      </div>

      {/* Vehicles in Maintenance */}
      <div className="card p-3 shadow-sm table-responsive">
        {maintenanceVehicles.length === 0 ? <p>No vehicles currently in maintenance</p> : (
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
              {maintenanceVehicles.map(v => (
                <tr key={v._id}>
                  <td>{v.name}</td>
                  <td>{v.capacity} kg</td>
                  <td><span className="badge bg-warning">In Shop</span></td>
                  <td>
                    <button className="btn btn-sm btn-success" onClick={() => completeMaintenance(v._id)}>Mark Completed</button>
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

export default Maintenance;