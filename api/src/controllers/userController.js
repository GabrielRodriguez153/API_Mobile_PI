import User from '../models/User.js';

export const getProfile = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
};

export const updateProfile = async (req, res) => {
  try {
    const updates = req.body;
    if (updates.password) delete updates.password; 
    const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateImage = async (req, res, next) => {
  try{
    const path = `/uploads/${req.file.filename}`;
    const user = await User.findByIdAndUpdate(req.user._id, {profileImage: path}, {new: true});
    res.json(user);
  } catch(err) { next(err); }
};

export const selectFarm = async (req, res) => {
  try{
    const user = await User.findByIdAndUpdate(
      req.userId,
      { selectedFarm: req.body.farmId },
      { new: true}
    );
    res.json(user);
  } catch(err){
    res.status(500).json({ error: err.message });
  }
};