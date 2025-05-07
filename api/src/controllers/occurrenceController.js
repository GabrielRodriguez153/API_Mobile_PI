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