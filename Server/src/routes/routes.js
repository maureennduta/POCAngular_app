const dbService = require("../services/dbService");
module.exports = [
  //home
  {
    method: "GET",
    path: "/api",
    handler: (request, h) => {
      return "Hello hapi!";
    },
  },

  //patients list
  {
    method: "GET",
    path: "/api/patients",
    handler: (request, h) => {
      return dbService.getPatients();
    },
  },

  //search patient by name
  {
    method: "GET",
    path: "/api/searchpatient/{name}",
    handler: (request, h) => {
      let names = request.params.name;
      return dbService.getPatientByName(names);
    },
  },

  //   //Hiv monthly report
  {
    method: "GET",
    path: "/api/hivreport/{month}",
    handler: (request, h) => {
      let month = request.params.month;
      return dbService.getHivMonthlyReport(month);
    },
  },

  //   //HIV positive  Patient List
  {
    method: "GET",
    path: "/api/positivepatientlist/{location}/{month}",
    handler: (request, h) => {
      let location = request.params.location;
      let month = request.params.month;
      return dbService.getHivPositivePatients(location, month);
    },
  },

  //HIV negative  Patient List
  {
    method: "GET",
    path: "/api/negativepatientlist/{location}/{month}",
    handler: (request, h) => {
      let location = request.params.location;
      let month = request.params.month;
      return dbService.getHivNegativePatients(location, month);
    },
  },
];
