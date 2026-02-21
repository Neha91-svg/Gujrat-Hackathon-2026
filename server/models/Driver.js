import mongoose from "mongoose";

const driverSchema = new mongoose.Schema({
  name: String,
  licenseExpiry: Date,
  status: { type: String, default: "On Duty" },
  safetyScore: Number
}, { timestamps: true });

export default mongoose.model("Driver", driverSchema);