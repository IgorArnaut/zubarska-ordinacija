const Termin = require("../models/termin.model.js");

exports.zakazi = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Sadržaj ne sme biti prazan!",
    });
  }

  const termin = new Termin({
    id: req.body.id,
    datum: req.body.datum,
    vreme: req.body.vreme,
    jmbg: req.body.jmbg,
    ime: req.body.ime,
    prezime: req.body.prezime,
    brTelefona: req.body.brTelefona,
  });

  Termin.zakazi(termin, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Greška prilikom zakazivanja termina.",
      });
    else res.send(data);
  });
};

exports.vratiSve = (req, res) => {
  Termin.vratiSve((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Greška prilikom dobavljanja termina.",
      });
    else res.send(data);
  });
};

exports.vratiPoJMBG = (req, res) => {
  Termin.pronadjiPoJMBG(req.params.jmbg, (err, data) => {
    if (err) {
      if (err.kind === "Nisu pronađeni termini") {
        res.status(404).send({
          message: `Nisu pronađeni termini za pacijenta sa JMBG ${req.params.jmbg}.`,
        });
      } else {
        res.status(500).send({
          message: `Greška prilikom dobavljanja termina za pacijenta sa JMBG ${req.params.jmbg}`,
        });
      }
    } else res.send(data);
  });
};

exports.otkazi = (req, res) => {
  Termin.otkazi(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Nije pronađen termin") {
        res.status(404).send({
          message: `Nije pronađen termin sa id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: `Ne može se izbrisati termin sa id ${req.params.id}`,
        });
      }
    } else res.send({ message: `Termin je uspešno izbrisan!` });
  });
};
