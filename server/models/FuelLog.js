import mongoose from "mongoose";

const fuelSchema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  liters: Number,
  cost: Number,
  date: Date
});

export default mongoose.model("FuelLog", fuelSchema);