import Analysis from "../models/Analysis.js";
import mongoose from "mongoose";

export const createAnalyses = async (req, res) => {
  try {
    const data = req.body;
    const result = await Analysis.insertMany(data);
    res
      .status(201)
      .json({ message: "Dados inseridos com sucesso!", inserted: result });
  } catch (error) {
    res.status(500).json({ message: "Erro ao inserir dados", error });
  }
};

export const getDashboard = async (req, res) => {
  try {
    const { farmId, from, to } = req.query;

    if (!farmId) {
      return res
        .status(400)
        .json({ message: "Parâmetro 'farmId' é obrigatório." });
    }

    const filter = { farmId };

    if (from || to) filter.date = {};
    if (from) filter.date.$gte = new Date(from);
    if (to) filter.date.$lte = new Date(to);

    const analyses = await Analysis.find(filter);
    const total = analyses.length;
    const infected = analyses.reduce((sum, a) => sum + a.infectedCount, 0);
    const healthy = analyses.reduce((sum, a) => sum + a.healthyCount, 0);

    res.json({ total, infected, healthy, analyses });
  } catch (error) {
    res.status(500).json({ message: "Erro ao obter dashboard", error });
  }
};

export const getComparison = async (req, res) => {
  const { farms } = req.body;
  try {
    if (!farms || farms.length === 0) {
      return res.status(400).json({ message: "Nenhuma fazenda fornecida." });
    }

    const results = await Promise.all(
      farms.map((farmId) =>
        Analysis.aggregate([
          { $match: { farmId: new mongoose.Types.ObjectId(farmId) } },
          { $group: { _id: null, avgIndex: { $avg: "$index" } } },
        ])
      )
    );

    res.json(results);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erro ao processar a comparação das fazendas.", error });
  }
};

export const getSummary = async (req, res) => {
  const { farmId } = req.query;
  const objectFarmId = new mongoose.Types.ObjectId(farmId);

  const analyses = await Analysis.find({ farmId: objectFarmId });

  const total = analyses.length;
  const infected = analyses.reduce((s, a) => s + a.infectedCount, 0);
  const healthy = analyses.reduce((s, a) => s + a.healthyCount, 0);

  const byDay = await Analysis.aggregate([
    { $match: { farmId: objectFarmId } },
    {
      $addFields: {
        day: {
          $dateToString: { format: "%d-%m-%Y", date: "$date" },
        },
      },
    },
    { $group: { _id: "$day", count: { $sum: 1 } } },
    { $sort: { _id: 1 } },
  ]);

  res.json({ total, infected, healthy, byDay });
};
