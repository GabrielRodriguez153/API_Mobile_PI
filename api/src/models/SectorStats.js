import mongoose from "mongoose";

const sectorStatsSchema = new mongoose.Schema({
  farm: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Farm",
    required: true,
  },
  sectorName: {
    type: String,
    required: true,
  },
  healthy: {
    type: Number,
    default: 0,
  },
  attention: {
    type: Number,
    default: 0,
  },
  severe: {
    type: Number,
    default: 0,
  },
  critical: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

sectorStatsSchema.index({ farm: 1, sectorName: 1 });

export default mongoose.model("SectorStats",sectorStatsSchema);
