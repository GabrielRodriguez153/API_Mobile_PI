import mongoose from "mongoose";

const DataSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  location: { type: String },
  image: { type: String },
  prediction: { type: String },
  confidence: { type: Number },
});

export default mongoose.model("Data", DataSchema);
