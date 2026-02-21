import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Drivers = () => {
  const fleet = useContext(FleetContext);
  const [name, setName] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");

  if (!fleet) return <div>Loading...</div>;

  const { drivers, addDriver, deleteDriver, updateDriverStatus } = fleet;

  const handleAddDriver = async () => {
    if (!name || !licenseExpiry) return;
    await addDriver({ name, licenseExpiry, status: "Active" });
    setName(""); setLicenseExpiry("");
  };

  return (
    <div className="container my-4">
      <h3 className="mb-4 text-primary">Driver Management</h3>

      {/* Add Driver */}
      <div className="card p-3 mb-4 shadow-sm d-flex flex-wrap gap-2">
        <input
          className="form-control"
          placeholder="Driver Name"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="form-control"
          type="date"
          value={licenseExpiry}
          onChange={e => setLicenseExpiry(e.target.value)}
        />
        <button className="btn btn-primary" onClick={handleAddDriver}>Add Driver</button>
      </div>

      {/* Drivers Table */}
      <div className="card p-3 shadow-sm table-responsive">
        {drivers.length === 0 ? <p>No drivers registered</p> : (
          <table className="table table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>License Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map(d => (
                <tr key={d._id}>
                  <td>{d.name}</td>
                  <td>{d.licenseExpiry}</td>
                  <td>
                    <span className={`badge ${d.status === "Active" ? "bg-success" : "bg-danger"}`}>
                      {d.status}
                    </span>
                  </td>
                  <td className="d-flex gap-2">
                    <button
                      className={`btn btn-sm ${d.status === "Active" ? "btn-warning" : "btn-success"}`}
                      onClick={() =>
                        updateDriverStatus(d._id, d.status === "Active" ? "Suspended" : "Active")
                      }
                    >
                      {d.status === "Active" ? "Suspend" : "Activate"}
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => deleteDriver(d._id)}>Delete</button>
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

export default Drivers;