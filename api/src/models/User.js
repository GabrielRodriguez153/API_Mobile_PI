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
      location: {
        type: { type: String, enum: ["Point"], default: "Point" },
        coordinates: { type: [Number], required: true }
      }
    }
  },
  { timestamps: true }
);

UserSchema.pre('save', function(next) {
  if (this.address?.location && !this.address.location.type) {
    this.address.location.type = "Point";
  }
  next();
});

export default mongoose.model("User", UserSchema);
