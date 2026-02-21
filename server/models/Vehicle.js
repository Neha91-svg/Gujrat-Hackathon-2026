import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  model: String,
  licensePlate: { type: String, unique: true },
  capacity: Number,
  status: { type: String, default: "Available" } // Available | On Trip | In Shop
});

export default mongoose.model("Vehicle", schema);