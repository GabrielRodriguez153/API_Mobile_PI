import SectorStats from "../models/SectorStats.js";

export async function upsertStats(req, res) {
  try {
    const payload = req.body;

    const items = Array.isArray(payload) ? payload : [payload];

    const operations = items.map(({ farmId, sectorName, healthy, attention, severe, critical }) => ({
      updateOne: {
        filter: { farm: farmId, sectorName },
        update: { $set: { healthy, attention, severe, critical, date: new Date() } },
        upsert: true,
      }
    }));

    const result = await SectorStats.bulkWrite(operations, { ordered: false });

    const updatedDocs = await SectorStats.find({
      $or: items.map(({ farmId, sectorName }) => ({ farm: farmId, sectorName }))
    }).lean();

    res.status(200).json({ result, stats: updatedDocs });
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