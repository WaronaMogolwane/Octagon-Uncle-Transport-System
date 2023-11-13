import dotenv from "dotenv";
import { Client, Pool } from "pg";

const dotEnv = dotenv.config();
export const DbClient = new Client({
  connectionString: process.env.PSQL_CONNECTION_STRING,
});
export const DbConnect = async () => {
  await DbClient.connect();
};
export const EndConnection = async () => {
  await DbClient.end();
};

export const DbPool = new Pool({
  connectionString: process.env.PSQL_CONNECTION_STRING,
  max: 5,
  connectionTimeoutMillis: 2000,
  idleTimeoutMillis: 2000,
  allowExitOnIdle: false,
});
