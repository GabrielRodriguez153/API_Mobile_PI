import Occurrence from '../models/Occurrence.js';

export const createOccurrence = async (req, res) => {
 try {
    const occs = await Occurrence.insertMany(req.body);
    res.status(201).json(occs);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const getHistory = async (req, res) => {
  const { farmId } = req.query;
  const filter = farmId ? { farmId } : {};
  const occ = await Occurrence.find(filter).populate('farmId');
  res.json(occ);
};

export const getStatsByAge = async (req, res) => {
  const { farmId } = req.query;
  const match = farmId ? { farmId } : {};
  const stats = await Occurrence.aggregate([
    { $match: match },
    { $group: { _id: "$plantAgeMonths", count: { $sum: 1 } } }
  ]);
  res.json(stats);
};

export const getStatsByDate = async (req, res) => {
  const { farmId } = req.query;
  const match = farmId ? { farmId } : {};
  const stats = await Occurrence.aggregate([
    { $match: match },
    { $group: { _id: '$date', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  res.json(stats);
};

export const getOccurrenceSummary = async (req, res) => {
  const { farmId } = req.query;
  const filter = farmId ? { farmId } : {};
  const all = await Occurrence.find(filter);
  const total = all.length;
  const sick = all.filter(o => o.infectedCounts > 0).length;
  const healthy = total - sick;
  res.json({ total, healthy, sick });
};

