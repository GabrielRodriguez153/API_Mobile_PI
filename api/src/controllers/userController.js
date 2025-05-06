import User from '../models/User.js';

export const getProfile = (req, res, next) => {
  res.json(req.user);
};

export const updateProfile = async (req, res, next) => {
  try{
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, updates, {new: true});
    res.json(user);
  } catch (err) { next(err); }
};

export const updateImage = async (req, res, next) => {
  try{
    const path = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user._id, {profileImage: path}, {new: true});
    res.json(user);
  } catch(err) { next(err); }
};