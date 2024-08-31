import mysql from "mysql2/promise";
import "dotenv/config";

const connection = mysql.createPool({
  host: process.env.INSTANCE_IP,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
});

export { connection };
