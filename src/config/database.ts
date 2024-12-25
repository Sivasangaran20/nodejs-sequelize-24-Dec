import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
import { User } from "../models/user";

dotenv.config();

console.log(process.env.DB_NAME);

const db = new Sequelize({
  database: process.env.DB_NAME,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  dialect: "mysql",
  host: process.env.DB_HOST,
  models: [User],
});

export default db;
