import knex from "knex";
import path from "path";

// const db = knex({
//   client: "mysql",
//   version: "5.7",
//   connection: {
//     host: "127.0.0.1",
//     user: "root",
//     password: "",
//     database: "Controle_xerox",
//   },
//   useNullAsDefault: true,
//   define: {
//     timestamp: true,
//     underscored: true,
//   },
// });

//"src/database/database.sqlite"

const db = knex({
  client: "sqlite3",
  connection: {
    filename: "src/database/database.sqlite",
    // filename: path.resolve(__dirname, "src", "database", database.sqlite),
  },
  useNullAsDefault: true,
  define: {
    timestamp: true,
    underscored: true,
  },
});

export default db;
