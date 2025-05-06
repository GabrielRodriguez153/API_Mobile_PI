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
export const uploadImage = multer({ storage }).single('profileImage');

async function validateAddress(address) {
  if (typeof address !== 'object' || !address.text || !address.location) return false;
  if (address.text.length < 10) return false;
  return true;
}

export async function signUp(req, res) {
  try{
    const { username, email, phone, address, password, confirmPassword, socialProviders } = req.body;
    
    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Senhas não Coincidem'});

    if (!await validateAddress(address))
      return res.status(400).json({ error: 'Endereço Inválido!'});

    const convertHash = await bcrypt.hash(password, 10);
    const userDados = { username, email, phone, address, password: convertHash};
    if(socialProviders) userDados.socialProviders = socialProviders;
    if(req.file) userDados.profileImage = `/uploads/${req.file.filename}`;

    const user = await User.create(userDados);
    return res.status(201).json({ id: user._id, username: user.username, profileImage: user.profileImage});
  } catch(err) {
    if (err.code === 11000)
      return res.status(409).json({ error: 'Usuário ou Email já cadastrados!'});
    return res.status(500).json({ error: err.message});
  }
}

export async function signIn(req, res){
  try{
    const { login, password } = req.body;

    const user = await User.findOne({
      $or: [{email: login}, {username: login}]
    });
    if (!user || !await bcrypt.compare(password, user.password))
        return res.status(401).json({ error: 'Credenciais Inválidas!'});

    const token = jwt.sign({ userId: user._id}, process.env.JWT_SECRET, {expiresIn: '2h'});
    return res.json({ token, profileImage: user.profileImage });
  } catch (err) {
    return res.status(500).json({ error: err.message});
  }
}