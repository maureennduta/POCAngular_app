const con = require("../Server/connection");

const def = {
  getPatients,
  getHivReport,
  getPatientsHivReport,
};

//get patients list
function getPatients() {
  return new Promise((resolve, reject) => {
    const query = "SELECT name,age,dob,gender,phone_number FROM patients";
    con.dbConnection().then((pool) => {
      pool.query(query, function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}

//get HIV monthly report
function getHivReport() {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT encounter_datetime as EncounterDate,location_id as Location, count(DISTINCT case when hiv_status='Positive' then hiv_status end) as Positive, count(DISTINCT case when hiv_status='NEGATIVE' then hiv_status end) as Negative FROM testDatabase.encounters WHERE hiv_status in ('Positive','NEGATIVE')GROUP BY Location,EncounterDate";
    con.dbConnection().then((pool) => {
      pool.query(query, function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}

//HIV Monthly Report Patient List
function getPatientsHivReport() {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT p.name, e.encounter_datetime, e.location_id,e.hiv_status,p.gender,p.age FROM testDatabase.patients p INNER JOIN testDatabase.encounters e ON p.patientId= e.patientId";
    con.dbConnection().then((pool) => {
      pool.query(query, function (error, results, fields) {
        if (error) throw error;
        resolve(results);
      });
    });
  });
}
module.exports= def;