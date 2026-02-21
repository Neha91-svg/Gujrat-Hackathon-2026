import { useState } from "react";
import type { Vehicle } from "../types/Vehicle";

const Vehicles = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  const addVehicle = () => {
    const newVehicle: Vehicle = {
      id: Date.now().toString(),
      name: "Van-01",
      capacity: 500,
      odometer: 12000,
      status: "Available",
      acquisitionCost: 1000000,
    };

    setVehicles([...vehicles, newVehicle]);
  };

  return (
    <div>
      <h2>Vehicle Registry</h2>
      <button onClick={addVehicle}>Add Vehicle</button>

      {vehicles.map((v) => (
        <div key={v.id}>
          {v.name} - {v.status} - {v.capacity}kg
        </div>
      ))}
    </div>
  );
};

export default Vehicles;