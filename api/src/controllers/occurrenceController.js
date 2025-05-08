import Occurrence from '../models/Occurrence.js';

export const getHistory = async (req, res) => {
  const { farmId } = req.query;
  const filter = farmId ? { farm: farmId } : {};
  const occ = await Occurrence.find(filter).populate('farm');
  res.json(occ);
};

export const getStatsByAge = async (req, res) => {
  const { farmId } = req.query;
  const stats = await Occurrence.aggregate([
    { $match: { farm: farmId } },
    { $group: { _id: "$age", count: { $sum: 1 } } }
  ]);
  res.json(stats);
};

export const getStatsByDate = async (req, res) => {
  const { farmId } = req.query;
  const stats = await Occurrence.aggregate([
    { $match: { farm: farmId } },
    { $group: { _id: '$date', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  res.json(stats);
};

export const getOccurrenceSummary = async (req, res) => {
  const { farmId } = req.query;
  const all = await Occurrence.find({ farm: farmId });
  const total = all.length;
  const sick = all.filter(o=>o.isInfected).length;
  const healthy = total - sick;
  res.json({ total, healthy, sick });
};

