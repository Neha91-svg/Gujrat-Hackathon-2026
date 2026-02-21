import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  model: { type: String, required: true },
  licensePlate: { type: String, unique: true, required: true },
  capacityKg: Number,
  odometer: Number,
  status: { type: String, default: "Available" },
  acquisitionCost: Number
}, { timestamps: true });

export default mongoose.model("Vehicle", vehicleSchema);