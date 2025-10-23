import mysql from "mysql2/promise";

let connection: any;

export async function getConnection() {
  if (!connection) {
    connection = await mysql.createConnection({
      host: "srv482.hstgr.io",
      user: "u224085852_info",
      password: "Codeclub@68",
      database: "u224085852_haasil_db",
    });
  }
  return connection;


}
