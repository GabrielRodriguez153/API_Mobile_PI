import mongoose from "mongoose";

const OccurrenceSchema = new mongoose.Schema({
  farmId: { type: mongoose.Schema.Types.ObjectId, ref: "Farm", required: true },
  date: { type: Date, required: true, default:Date.now },
  infectedCounts: { type: Number, required: true },
  healthyCounts: { type: Number, required: true },
  totalCounts: { type: Number, required: true }, 
  plantAgeMonths: { type: Number, required: true },
}, { timestamps: true });

export default mongoose.model("Occurrence", OccurrenceSchema);