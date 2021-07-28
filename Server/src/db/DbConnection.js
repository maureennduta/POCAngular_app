"use strict";

const config = require("../../config/config.json");
const mysql = require("mysql");

//connection
const dbCon = mysql.createPool({
  host: config.mysql.host,
  port: config.mysql.port,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database,
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
  });
 
}





module.exports = serviceDef;
