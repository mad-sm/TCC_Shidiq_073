import { Sequelize } from "sequelize";

const db = new Sequelize('cloud_db','root','jelajahilah21',{
    host: '34.44.126.1',
    dialect: 'mysql',
}); 

export default db;