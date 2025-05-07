import Analysis from '../models/Analysis.js';

export const createScanAnalysis = async (req, res) => {
  try {
    const { farmId, humidity, infectedCount, healthyCount } = req.body;
    
    const analysis = await Analysis.create({
      farmId,
      humidity,
      infectedCount,
      healthyCount,
      rejectedCount: 0 
    });

    res.status(201).json(analysis);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};