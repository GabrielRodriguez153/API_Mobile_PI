import User from '../models/User.js';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb){
    const ext = path.extname(file.originalname);
    cb(null, `profile_${req.userId || Date.now()}${ext}`);
  }
});
export const uploadImages = multer({ storage }).single('profileImage');

function generateToken(userId) {
  return jwt.sign(
    { userId },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );
}

async function validateAddress(address) {
  if (
    typeof address !== 'object' || 
    !address.text || 
    typeof address.lat !== 'number' || 
    typeof address.lng !== 'number'
  ) return false;
  
  if (address.text.length < 10) return false;
  return true;
}

export async function signUp(req, res) {
  try {
    const { username, email, phone, address, password, confirmPassword } = req.body;
    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Senhas não coincidem' });
    if (!await validateAddress(address))
      return res.status(400).json({ error: 'Endereço inválido!' });

    const hashed = await bcrypt.hash(password, 10);
    const userData = { username, email, phone, address, password: hashed };
    if (req.file) userData.profileImage = `/uploads/${req.file.filename}`;

    const user = await User.create(userData);

    const token = generateToken(user._id);
    return res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        profileImage: user.profileImage || null
      }
    });
  } catch (err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Usuário ou email já cadastrados!' });
    return res.status(500).json({ error: err.message });
  }
}

export async function signIn(req, res) {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({
      $or: [{ email: login }, { username: login }]
    });
    if (!user)
      return res.status(404).json({ error: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid)
      return res.status(401).json({ error: 'Credenciais inválidas' });

    const token = generateToken(user._id);
    return res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        profileImage: user.profileImage || null
      }
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}