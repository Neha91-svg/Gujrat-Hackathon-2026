import mongoose from "mongoose";

const schema = new mongoose.Schema({
  vehicleId: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  liters: Number,
  cost: Number,
  date: { type: Date, default: Date.now }
});

export default mongoose.model("FuelLog", schema);