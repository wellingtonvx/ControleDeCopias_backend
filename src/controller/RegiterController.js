/**
 * Esse controller e o responsável pela criação dos registros
 *
 * checkUserexist : verifica se o Usuário existe
 * createUser : cria um novo usuário dentro do banco
 */

import db from "../database/connections";

class RegisterController {
  async index(req, res) {
    const connect = await db.transaction();

    const listRegistros = await connect.select().from("registros");

    await connect.commit();
    return res.json(listRegistros);
  }

  async create(req, res) {
    const { setor, descricao, requerente, num_pages, num_copias } = req.body;

    const totalCopies = num_pages * num_copias;

    const connect = await db.transaction();

    try {
      const insertRegistre = await connect("registros").insert({
        setor: setor,
        descricao: descricao,
        requerente: requerente,
        num_pages: num_pages,
        num_copias: num_copias,
        total: totalCopies,
        // user_id: req.userId,
      });

      await connect.commit();
    } catch (error) {
      connect.rollback();
      console.log(error);
      return res.status(401).json({
        error: "erro ao criar o registro",
      });
    }

    return res.json({
      setor,
      descricao,
      num_pages,
      num_copias,
      total: totalCopies,
    });
  }
}

export default new RegisterController();
