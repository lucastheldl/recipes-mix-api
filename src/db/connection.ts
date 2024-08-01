import mysql from "mysql2/promise";
import "dotenv/config";

const connection = mysql.createPool({
  host: "localhost",
  database: "test",
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export { connection };
