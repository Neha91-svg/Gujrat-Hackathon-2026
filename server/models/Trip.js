import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  cargoWeight: Number,
  status: { type: String, default: "Draft" },
  startOdometer: Number,
  endOdometer: Number
}, { timestamps: true });

export default mongoose.model("Trip", tripSchema);