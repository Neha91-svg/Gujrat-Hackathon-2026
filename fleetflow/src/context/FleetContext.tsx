import { createContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import axios from "axios";

interface Vehicle { _id: string; name: string; capacity: number; status: string; }
interface Driver { _id: string; name: string; licenseExpiry?: string; status: string; }
interface Trip { _id: string; vehicleId: string; driverId: string; cargoWeight: number; status: string; }
interface Expense { _id: string; title: string; amount: number; category: string; date: string; }

interface FleetContextType {
  vehicles: Vehicle[];
  drivers: Driver[];
  trips: Trip[];
  expenses: Expense[];
  addDriver: (d: Partial<Driver>) => Promise<void>;
  deleteDriver: (id: string) => Promise<void>;
  updateDriverStatus: (id: string, status: string) => Promise<void>;
  addVehicle: (v: Partial<Vehicle>) => Promise<void>;
  deleteVehicle: (id: string) => Promise<void>;
  updateVehicleStatus: (id: string, status: string) => Promise<void>;
  addTrip: (t: Partial<Trip>) => Promise<void>;
  completeTrip: (id: string) => Promise<void>;
  addExpense: (e: Partial<Expense>) => Promise<void>;
  deleteExpense: (id: string) => Promise<void>;
}

export const FleetContext = createContext<FleetContextType | undefined>(undefined);

export const FleetProvider = ({ children }: { children: ReactNode }) => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [trips, setTrips] = useState<Trip[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const API_BASE = "http://localhost:5000/api";

  const fetchAll = async () => {
    const [vRes, dRes, tRes, eRes] = await Promise.all([
      axios.get(`${API_BASE}/vehicles`),
      axios.get(`${API_BASE}/drivers`),
      axios.get(`${API_BASE}/trips`),
      axios.get(`${API_BASE}/expenses/fuel`),
    ]);
    setVehicles(vRes.data);
    setDrivers(dRes.data);
    setTrips(tRes.data);
    setExpenses(eRes.data);
  };

  useEffect(() => { fetchAll(); }, []);

  // Drivers
  const addDriver = async (d: Partial<Driver>) => { await axios.post(`${API_BASE}/drivers`, d); await fetchAll(); };
  const deleteDriver = async (id: string) => { await axios.delete(`${API_BASE}/drivers/${id}`); await fetchAll(); };
  const updateDriverStatus = async (id: string, status: string) => { await axios.put(`${API_BASE}/drivers/${id}`, { status }); await fetchAll(); };

  // Vehicles
  const addVehicle = async (v: Partial<Vehicle>) => { await axios.post(`${API_BASE}/vehicles`, v); await fetchAll(); };
  const deleteVehicle = async (id: string) => { await axios.delete(`${API_BASE}/vehicles/${id}`); await fetchAll(); };
  const updateVehicleStatus = async (id: string, status: string) => { await axios.put(`${API_BASE}/vehicles/${id}`, { status }); await fetchAll(); };

  // Trips
  const addTrip = async (t: Partial<Trip>) => { await axios.post(`${API_BASE}/trips`, t); await fetchAll(); };
  const completeTrip = async (id: string) => { await axios.put(`${API_BASE}/trips/${id}/complete`); await fetchAll(); };

  // Expenses
  const addExpense = async (e: Partial<Expense>) => { await axios.post(`${API_BASE}/expenses/fuel`, e); await fetchAll(); };
  const deleteExpense = async (id: string) => { await axios.delete(`${API_BASE}/expenses/fuel/${id}`); await fetchAll(); };

  return (
    <FleetContext.Provider value={{
      vehicles, drivers, trips, expenses,
      addDriver, deleteDriver, updateDriverStatus,
      addVehicle, deleteVehicle, updateVehicleStatus,
      addTrip, completeTrip, addExpense, deleteExpense
    }}>
      {children}
    </FleetContext.Provider>
  );
};