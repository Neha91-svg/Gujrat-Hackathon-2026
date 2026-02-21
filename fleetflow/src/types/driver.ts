export interface Driver {
  id: string;
  name: string;
  licenseExpiry: string;
  status: "On Duty" | "Off Duty" | "Suspended";
  safetyScore: number;
}