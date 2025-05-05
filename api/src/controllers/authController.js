import User from '../models/User.js';
import bcrypt, { hash } from 'bcryptjs';
import jwt from 'jsonwebtoken';

async function validateAddress(address) {
  if (typeof address !== 'string' || address.length < 10) return false;
  return true;
}

export async function signUp(req, res) {
  try{
    const { username, email, phone, address, password, confirmPassword } = req.body;
    
    if (password !== confirmPassword)
      return res.status(400).json({ error: 'Senhas não Coincidem'});

    if (!await validateAddress(address))
      return res.status(400).json({ error: 'Endereço Inválido!'});

    const convertHash = await bcrypt.hash(password, 10);
    const user = await User.create({ username, email, phone, address, password: convertHash});
    return res.status(201).json({ id: user._id, username: user.username});
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
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: err.message});
  }
}