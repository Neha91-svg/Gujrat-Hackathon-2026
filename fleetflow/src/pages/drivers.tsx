import { useContext, useState } from "react";
import { FleetContext } from "../context/FleetContext";

const Drivers = () => {
  const fleet = useContext(FleetContext);

  const [name, setName] = useState("");
  const [licenseExpiry, setLicenseExpiry] = useState("");

  if (!fleet) return <div>Loading...</div>;

  const {
    drivers,
    addDriver,
    deleteDriver,
    updateDriverStatus,
  } = fleet;

  const addNewDriver = () => {
    if (!name || !licenseExpiry) return;

    addDriver({
      id: Date.now().toString(),
      name,
      licenseExpiry,
      status: "Active",
    });

    setName("");
    setLicenseExpiry("");
  };

  return (
    <div>

      <h3 className="mb-4">Driver Management</h3>

      {/* ADD DRIVER FORM */}
      <div className="dashboard-card mb-4">
        <h5 className="mb-3">Add New Driver</h5>

        <div className="row g-3">
          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Driver Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="col-md-5">
            <input
              type="date"
              className="form-control"
              value={licenseExpiry}
              onChange={(e) => setLicenseExpiry(e.target.value)}
            />
          </div>

          <div className="col-md-2">
            <button
              className="btn btn-info w-100"
              onClick={addNewDriver}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      {/* DRIVER TABLE */}
      <div className="dashboard-card">

        {drivers.length === 0 ? (
          <div className="text-muted">
            No drivers registered
          </div>
        ) : (
          <table className="table table-dark table-hover align-middle">
            <thead>
              <tr>
                <th>Name</th>
                <th>License Expiry</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {drivers.map((d) => (
                <tr key={d.id}>
                  <td>{d.name}</td>
                  <td>{d.licenseExpiry}</td>
                  <td>
                    <span
                      className={`badge ${
                        d.status === "Active"
                          ? "bg-success"
                          : "bg-danger"
                      }`}
                    >
                      {d.status}
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() =>
                        updateDriverStatus(
                          d.id,
                          d.status === "Active"
                            ? "Suspended"
                            : "Active"
                        )
                      }
                    >
                      {d.status === "Active"
                        ? "Suspend"
                        : "Activate"}
                    </button>

                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteDriver(d.id)}
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

export default Drivers;