import mysql from "mysql2/promise";

let connection: any;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "localhost", // or your MySQL server host
      user: "root", // your MySQL username
      password: "", // your MySQL password
      database: "haasil_db", // your database name
    });
  }
  return connection;
}
