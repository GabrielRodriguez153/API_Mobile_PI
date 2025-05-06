import mongoose from "mongoose";
import AddressSchema from "./Address.js";

const FarmSchema = new mongoose.Schema({
  name: { type: String, required: true },
  address: { type: AddressSchema, required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  contactPhone: { type: String }
}, { timestamps: true });

export default mongoose.model("Farm", FarmSchema);