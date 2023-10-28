import mysql from "mysql";

export const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: '',
    database:"blog",
    port: 3308
  })