import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "151.106.124.201",
  user: "u224085852_info",
  password: "Codeclub@68",
  database: "u224085852_haasil_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export function getConnection() {
  return pool;
}