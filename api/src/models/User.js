import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    profileImage: {
      type: String,
    },
    selectedFarm: {type: mongoose.Schema.Types.ObjectId, ref: "Farm" },
    address: {
      text: String,
      lat: Number,
      lng: Number,
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
