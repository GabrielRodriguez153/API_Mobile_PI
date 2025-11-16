import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [scheme, token] = authHeader.split(" ")[1];
  if (scheme !== "Bearer" || !token)
    return res.status(401).json({ error: "Token mal formatado" });

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.userId = payload.userId;
    return next();
  } catch (err) {
    return res.status(401).json({ error: "Token inválido ou expirado" });
  }
}
