"use strict";

const Hapi = require("@hapi/hapi");
const dbService = require("../src/services/dbService");

const init = async () => {
  //server
  const server = Hapi.server({
    port: 8000,
    host: "localhost",
  });

  server.route([
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
      path: "/api/searchPatient/{name}",
      handler: (request, h) => {
        let names = request.params.name;
        // console.log(names);
        // return names;
        return dbService.getPatientByName(names);
      },
    },
    //Hiv monthly report
    {
      method: "GET",
      path: "/api/hivReport/{month}",
      handler: (request, h) => {
        let month = request.params.month;
        // return month;
        return dbService.getHivMonthlyReport(month);
      },
    },

    //HIV positive  Patient List
    {
      method: "GET",
      path: "/api/positivepatientlist/{location}/{month}",
      handler: (request, h) => {
        let location = request.params.location;
        let month = request.params.month;

        // return location;
        return dbService.getHivPositivePatients(location,month);
      },
    },

    //HIV negative  Patient List
    {
      method: "GET",
      path: "/api/negativepatientlist/{location}/{month}",
      handler: (request, h) => {
        let location = request.params.location;
        let month = request.params.month;

        // return location;
        return dbService.getHivNegativePatients(location,month);
      },
    },
  ]);

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
