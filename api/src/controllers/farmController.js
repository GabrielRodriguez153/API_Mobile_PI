import Farm from '../models/Farm.js';

export const createFarm = async (req, res) => {
  const data = { ...req.body, owner: req.userId };
  const farm = await Farm.create(data);
  res.status(201).json(farm);
};

export const getFarms = async (req, res) => {
  const farms = await Farm.find({ owner: req.userId });
  res.json(farms);
};

export const getFarmById = async (req, res) => {
  const farm = await Farm.findById(req.params.id).populate('owner');
  res.json(farm);
};

export const updateFarm = async (req, res) => {
  const farm = await Farm.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(farm);
};

export const deleteFarm = async (req, res) => {
  await Farm.findByIdAndDelete(req.params.id);
  res.status(204).end();
};


