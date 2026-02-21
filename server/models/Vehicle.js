import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
  model: String,
  licensePlate: { type: String, unique: true },
  capacityKg: Number,
  odometer: Number,
  status: String,
  acquisitionCost: Number
});

export default mongoose.model("Vehicle", vehicleSchema);