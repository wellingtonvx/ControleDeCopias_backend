import jwt from "jsonwebtoken";
import auth from "../config/auth";
import { promisify } from "util";

export default async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "token not provider" });
  }

  const [, token] = authHeader.split(" ");

  try {
    //verificando se o token passado é válido
    const decoded = await promisify(jwt.verify)(token, auth.secret);

    console.log(decoded);

    //incluindo o id dentro do req
    req.userId = decoded.id;

    return next();
  } catch (error) {
    return res.status(401).json({ error: "Token Invalid" });
  }
};
