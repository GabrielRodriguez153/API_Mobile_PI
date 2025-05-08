import Analysis from '../models/Analysis.js';

export const getDashboard = async (req, res) => {
  const { farmId, from, to } = req.query;
  const filter = { farm: farmId };
  if (from || to) filter.date = {};
  if (from) filter.date.$gte = new Date(from);
  if (to) filter.date.$lte = new Date(to);
  const analyses = await Analysis.find(filter);
  const total = analyses.length;
  const infected = analyses.reduce((sum,a)=> sum + a.infectedCount,0);
  const healthy = analyses.reduce((sum,a)=> sum + a.healthyCount,0);
  res.json({ total, infected, healthy, analyses });
};

export const getComparison = async (req, res) => {
  const { farms } = req.body;
  const results = await Promise.all(farms.map(id=>
    Analysis.aggregate([
      { $match: { farm: id } },
      { $group: { _id: null, avgIndex: { $avg: "$index" } } }
    ])
  ));
  res.json(results);
};

export const getSummary = async (req, res) => {
  const { farmId } = req.query;
  const analyses = await Analysis.find({ farm: farmId });
  const total = analyses.length;
  const infected = analyses.reduce((s,a)=>s+a.infectedCount,0);
  const healthy = analyses.reduce((s,a)=>s+a.healthyCount,0);
  const byDay = await Analysis.aggregate([
    { $match: { farm: farmId } },
    { $group: { _id: '$date', count: { $sum: 1 } } },
    { $sort: { _id: 1 } }
  ]);
  res.json({ total, infected, healthy, byDay });
};
