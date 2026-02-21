import mongoose from "mongoose";

const schema = new mongoose.Schema({
  name: String,
  licenseNumber: String,
  status: { type: String, default: "Active" } // Active | Suspended | Off Duty
});

export default mongoose.model("Driver", schema);