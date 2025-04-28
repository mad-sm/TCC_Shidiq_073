import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const user = db.define(
    "users",
    {
        nama: Sequelize.STRING,
        judul: Sequelize.STRING,
        catatan: Sequelize.STRING,
    },
    {
        freezeTableName: true,
        createdAt: "tanggal_dibuat",
        updatedAt: "tanggal_diubah",
    }
);

db.sync().then(() => console.log("Database synced"));

export default user;
