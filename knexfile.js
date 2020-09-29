const path = require("path");

module.exports = {
  client: "mysql",
  connection: {
    //filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "Controle_xerox",
  },
  useNullAsDefault: true,
  define: {
    timestamp: true,
    underscored: true,

    // filename: path.resolve(__dirname, "src", "database", "database.sqlite"),
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "migrations"),
  },
  useNullAsDefault: true,
};
