export interface Vehicle {
  id: string;
  name: string;
  capacity: number;
  odometer: number;
  status: "Available" | "On Trip" | "In Shop";
  acquisitionCost: number;
}