const con = require("../db/DbConnection");

const def = {
  getPatients,
  getPatientByName,
  getHivMonthlyReport,
  getHivPositivePatients,
  getHivNegativePatients
};

//get all patients
function getPatients() {
  return new Promise((resolve, reject) => {
    const query = "SELECT name,age,dob,gender,phone_number FROM patients";
    con.dbConnection().then((pool) => {
      pool.query(query, (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}

//get patient by name
function getPatientByName(name) {
  return new Promise((resolve, reject) => {
    const query = `SELECT name,age,dob,gender,phone_number FROM patients WHERE name LIKE '%${name}'`;
    console.log(query);
    con.dbConnection().then((pool) => {
      pool.query(query, (error, results, fields) => {
        if (error) throw error;
        resolve(results);
        console.log(results);
      });
    });
  });
}

//get HIV monthly report
function getHivMonthlyReport(month) {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT MONTH(encounter_datetime) as Month,location_id as Location, count(DISTINCT case when hiv_status='Positive' then hiv_status end) as Positive, count(DISTINCT case when hiv_status='NEGATIVE' then hiv_status end) as Negative FROM testDatabase.encounters WHERE hiv_status in ('Positive','NEGATIVE') AND MONTH(encounter_datetime) =${month} GROUP BY Location,Month`;
    con.dbConnection().then((pool) => {
      pool.query(query, (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}

//HIV positive Monthly Report Patient List
function getHivPositivePatients(location,month) {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT p.name, e.encounter_datetime, e.location_id,e.hiv_status,p.gender,p.age FROM testDatabase.patients p INNER JOIN testDatabase.encounters e ON p.patientId= e.patientId  WHERE e.hiv_status='Positive' AND e.location_id=${location} AND month(encounter_datetime)=${month}`;
    con.dbConnection().then((pool) => {
      pool.query(query, (error, results, fields) => {
        if (error) throw error;
        console.log(results);
        resolve(results);
      });
    });
  });
}

//HIV negative monthly report patient list
function getHivNegativePatients(location,month) {
  return new Promise((resolve, reject) => {
    const query =
      `SELECT p.name, e.encounter_datetime, e.location_id,e.hiv_status,p.gender,p.age FROM testDatabase.patients p INNER JOIN testDatabase.encounters e ON p.patientId= e.patientId  WHERE e.hiv_status='Negative' AND e.location_id=${location} AND month(encounter_datetime)=${month}`;
    con.dbConnection().then((pool) => {
      pool.query(query, (error, results, fields) => {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}
module.exports = def;
