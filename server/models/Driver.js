import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: String,
  licenseExpiry: Date,
  status: String,
  safetyScore: Number
});

export default mongoose.model("Driver", driverSchema);