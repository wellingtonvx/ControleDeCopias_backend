exports.up = function (knex) {
  return knex.schema.createTable("registros", (table) => {
    table.increments("id").notNullable();
    table.string("setor").notNullable();
    table.string("descricao").notNullable();
    table.string("requerente").notNullable();
    table.integer("num_pages").notNullable();
    table.integer("num_copias").notNullable();
    table.integer("total").notNullable();
    table.timestamp("created_at").notNullable().defaultTo(knex.fn.now());
    table.timestamp("updated_at").notNullable().defaultTo(knex.fn.now());

    //relacinamento com a tabela de usuario
    // table
    //   .integer("user_id")
    //   .notNullable()
    //   .references("id")
    //   .inTable("users")
    //   .onDelete("CASCADE")
    //   .onUpdate("CASCADE");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("registros");
};
