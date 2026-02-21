import mongoose from "mongoose";

const schema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver" },
  cargoWeight: Number,
  status: { type: String, default: "Draft" } // Draft | Dispatched | Completed | Cancelled
});

export default mongoose.model("Trip", schema);