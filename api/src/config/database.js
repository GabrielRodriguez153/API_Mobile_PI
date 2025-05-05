import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export async function connectDB() {
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conexão com Banco feita com Sucesso!');
  } catch(err){
    console.log('Erro ao Conectar no Banco: ', err);
    process.exit(1);
  }
}