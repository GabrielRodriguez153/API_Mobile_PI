import SectorStats from "../models/SectorStats.js";

export async function upsertStats(req, res) {
  try {
  const { farmId, sectorName, healthy, attention, severe, critical } = req.body;
  const stats = await SectorStats.findOneAndUpdate(
  { farm: farmId, sectorName },
  { healthy, attention, severe, critical, date: new Date() },
  { upsert: true, new: true, setDefaultsOnInsert: true }
  );
  res.status(200).json(stats);
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
  }
  
  export async function getStatsByFarm(req, res) {
  try {
  const { farmId } = req.params;
  const stats = await SectorStats.find({ farm: farmId })
  .sort('sectorName')
  .lean();
  res.json(stats);
  } catch (err) {
  res.status(500).json({ error: err.message });
  }
  }