import mysql from "mysql2";

const host = process.env.HOST;
const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const databaseName = process.env.DATABASE;

export const DbPool = mysql.createPool({
  host: host,
  user: dbUser,
  password: dbPassword,
  database: databaseName,
  waitForConnections: true,
  multipleStatements: true,
  connectionLimit: 10,
  queueLimit: 0,
});
