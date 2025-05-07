import mongoose from "mongoose";
import AddressSchema from "./Address.js";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: AddressSchema, required: true },
    password: { type: String, required: true },
    socialProviders: [
      {
        providerName: String,
        providerId: String,
      },
    ],
    profileImage: {
      type: String,
    },
    selectedFarm: {type: mongoose.Schema.Types.ObjectId, ref: "Farm" }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
