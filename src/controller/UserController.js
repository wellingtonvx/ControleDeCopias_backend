/**
 * Esse controller e o responsável pela criação do usuário
 *
 * checkUserexist : verifica se o Usuário existe
 * createUser : cria um novo usuário dentro do banco
 */

import db from "../database/connections.js";
import bcrypt from "bcryptjs";

class UserController {
  async create(req, res) {
    const { name, email, sede } = req.body;

    const passwordHash = bcrypt.hashSync(req.body.password, 5);

    const connect = await db.transaction();

    const checkUserExist = await connect
      .select("email")
      .where({
        email: req.body.email,
      })
      .table("users");

    if (checkUserExist.length !== 0 && checkUserExist != null) {
      connect.rollback();
      return res.status(401).json({
        error: "User Alredy exist",
      });
    }
    try {
      const createUser = await connect("users").insert({
        name: name,
        email: email,
        password_hash: passwordHash,
        sede: sede,
      });

      await connect.commit();

      return res.json({
        name,
        email,
        sede,
      });
    } catch (error) {
      connect.rollback();
      return res.status(401).json({ error: "Erro ao criar o usuário" });
    }
  }
}

export default new UserController();
