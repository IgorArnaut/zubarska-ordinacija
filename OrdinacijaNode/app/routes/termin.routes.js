module.exports = (app) => {
  const termini = require("../controllers/termin.controller.js");

  var router = require("express").Router();

  router.post("/termini/", termini.zakazi);

  router.get("/termini/", termini.vratiSve);

  router.get("/pacijenti/:jmbg/termin", termini.vratiJedan);

  router.delete("/termini/:id", termini.otkazi);

  app.use("/api", router);
};
