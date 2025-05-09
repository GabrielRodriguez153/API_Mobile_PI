import mongoose from "mongoose";

const AnalysisSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  date: { type: Date, required: true, default: Date.now },
  humidity: { type: Number, required: true },
  infectedCount: { type: Number, required: true }, 
  healthyCount: { type: Number, required: true }, 
  rejectedCount: { type: Number, required: true, default: 0 },
  index: { type: Number, required: true }
}, { timestamps: true });

export default mongoose.model("Analysis", AnalysisSchema);