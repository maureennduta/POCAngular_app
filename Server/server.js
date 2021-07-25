"use strict";

const Hapi = require("@hapi/hapi");
const dbService = require("./dbService");

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
      path: "/",
      handler: (request, h) => {
        return "Hello hapi!";
      },
    },

    //patients list
    {
      method: "GET",
      path: "/patients",
      handler: (request, h) => {
        return dbService.getPatients();
      },
    },

    //Hiv monthly report
    {
      method: "GET",
      path: "/hivReport",
      handler: (request, h) => {
        return dbService.getHivReport();
      },
    },

    //HIV Monthly Report Patient List
    {
      method: "GET",
      path: "/patientListReport",
      handler: (request, h) => {
        return dbService.getPatientsHivReport();
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
