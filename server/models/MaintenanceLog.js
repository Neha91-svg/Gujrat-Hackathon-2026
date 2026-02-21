import mongoose from "mongoose";

const maintenanceSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  description: String,
  cost: Number,
  date: Date
});

export default mongoose.model("MaintenanceLog", maintenanceSchema);