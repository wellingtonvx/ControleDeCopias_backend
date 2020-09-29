/**
 * Esse controller e o responsável pelo logon
 *
 * checkUserexist : verifica se o Usuário existe
 * userPass : recebe a senha do banco de dados
 * userId : recebe o id do usuário
 * checkPass : verifica se a senha passada e igual a que tem no banco
 */

import db from "../database/connections";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import auth from "../config/auth";

class SessionController {
  async create(req, res) {
    const { email, password } = req.body;

    const connect = await db.transaction();

    const checkUserexist = await connect
      .select("email")
      .where({
        email: email,
      })
      .table("users");

    if (checkUserexist.length === 0) {
      connect.rollback();
      return res.status(401).json({
        error: "User not exist",
      });
    }

    const userPass = await connect("users")
      .where({
        email: email,
      })
      .select("password_hash");

    const userId = await connect("users")
      .where({
        email: email,
      })
      .select("id");

    const { password_hash } = userPass[0];
    const { id } = userId[0];

    const checkPass = bcrypt.compareSync(
      password,
      password_hash,
      (err, res) => {
        return res;
      }
    );

    if (!checkPass) {
      connect.rollback();
      return res.status(401).json({
        error: "wrong password",
      });
    }

    await connect.commit();

    return res.json({
      id,
      email,
      token: jwt.sign({ id }, auth.secret, {
        expiresIn: auth.expiresIn,
      }),
    });
  }
}

export default new SessionController();
