import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const host = process.env.OUTS_DATABASE_HOST;
const dbUser = process.env.OUTS_DATABASE_USER;
const dbPassword = process.env.OUTS_DATABASE_PASSWORD;
const databaseName = process.env.OUTS_DATABASE_NAME;

export const DbPool = mysql.createPool({
  host: host,
  user: dbUser,
  password: dbPassword,
  database: databaseName,
  waitForConnections: true,
  multipleStatements: true,
  connectionLimit: 10,
  queueLimit: 0,
  timezone: "Z",
});
