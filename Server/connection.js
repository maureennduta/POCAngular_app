"use strict";

const db = require("./database.json");
const mysql = require("mysql");

//connection
const dbCon = mysql.createPool({
  //   host: db.mysql.host,
  //   user: db.mysql.user,
  //   password: db.mysql.port,
  //   database: db.mysql.database,

  host: "134.209.246.16",
  port: "3306",
  user: "testuser",
  password: "123456789",
  database: "testDatabase",
});

dbCon.getConnection((err) => {
  if (err) throw err;
  console.log("Connected!!");
});

const serviceDef = {
  dbConnection: dbConnection,
};

// Test connection
function dbConnection() {
  return new Promise((resolve, reject) => {
    resolve(dbCon);
    console.log(dbCon);
  });
}

module.exports = serviceDef;
