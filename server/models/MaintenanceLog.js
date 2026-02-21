import mongoose from "mongoose";

const schema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  description: String,
  cost: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("MaintenanceLog", schema);