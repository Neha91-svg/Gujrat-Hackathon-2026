import { createContext, useState, ReactNode } from "react";

/* ================= TYPES ================= */

export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  status: "Available" | "On Trip" | "In Shop";
}

export interface Driver {
  id: string;
  name: string;
  licenseExpiry: string;
  status: "Active" | "Suspended";
}
export interface Expense {
  id: string;
  title: string;
  amount: number;
  category: "Fuel" | "Maintenance" | "Salary" | "Other";
  date: string;
}

export interface Trip {
  id: string;
  vehicleId: string;
  driverId: string;
  cargoWeight: number;
  status: "Dispatched" | "Completed";
}

/* ================= CONTEXT TYPE ================= */

interface FleetContextType {
    expenses: Expense[];
addExpense: (e: Expense) => void;
deleteExpense: (id: string) => void;
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  addVehicle: (v: Vehicle) => void;
  deleteVehicle: (id: string) => void;
  addDriver: (d: Driver) => void;
  deleteDriver: (id: string) => void;
  addTrip: (t: Trip) => void;
}

/* ================= CREATE CONTEXT ================= */

export const FleetContext = createContext<FleetContextType | null>(null);

/* ================= PROVIDER ================= */

export const FleetProvider = ({ children }: { children: ReactNode }) => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);

  const addVehicle = (v: Vehicle) =>
    setVehicles((prev) => [...prev, v]);

  const deleteVehicle = (id: string) =>
    setVehicles((prev) => prev.filter((v) => v.id !== id));

  const addDriver = (d: Driver) =>
    setDrivers((prev) => [...prev, d]);

  const deleteDriver = (id: string) =>
    setDrivers((prev) => prev.filter((d) => d.id !== id));

  const addTrip = (t: Trip) =>
    setTrips((prev) => [...prev, t]);

  const updateVehicleStatus = (id: string, status: Vehicle["status"]) =>
  setVehicles((prev) =>
    prev.map((v) =>
      v.id === id ? { ...v, status } : v
    )
  );

  const updateDriverStatus = (id: string, status: Driver["status"]) =>
  setDrivers((prev) =>
    prev.map((d) =>
      d.id === id ? { ...d, status } : d
    )
  );

  const addExpense = (e: Expense) =>
  setExpenses((prev) => [...prev, e]);

const deleteExpense = (id: string) =>
  setExpenses((prev) =>
    prev.filter((e) => e.id !== id)
  );

  return (
    <FleetContext.Provider
      value={{
        vehicles,
        drivers,
        trips,
        addVehicle,
        deleteVehicle,
        addDriver,
        deleteDriver,
        addTrip,
        updateVehicleStatus,
        updateDriverStatus,
        expenses,
addExpense,
deleteExpense,
      }}
    >
      {children}
    </FleetContext.Provider>
  );
};