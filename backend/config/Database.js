import { Sequelize } from "sequelize";

const db = new Sequelize("notes", "root", "bebas", {
    host: "34.44.45.42",
    dialect: "mysql",
});

export default db;
