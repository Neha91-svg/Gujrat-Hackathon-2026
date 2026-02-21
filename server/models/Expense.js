import mongoose from "mongoose";

const schema = new mongoose.Schema({
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: "Vehicle" },
  type: String, // Fuel | Maintenance
  amount: Number,
  date: Date
});

export default mongoose.model("Expense", schema);