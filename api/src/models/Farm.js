import mongoose from "mongoose";

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: String, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactPhone: { type: String }
}, { timestamps: true });

export default mongoose.model("Farm", FarmSchema);