import mongoose from "mongoose";

const tripSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driverId: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  cargoWeight: Number,
  status: String,
  startOdometer: Number,
  endOdometer: Number
});

export default mongoose.model("Trip", tripSchema);