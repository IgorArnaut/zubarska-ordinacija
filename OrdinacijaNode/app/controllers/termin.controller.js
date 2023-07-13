const Termin = require("../models/termin.model.js");

exports.zakazi = (req, res) => {
  if (!req.body) {
    res.status(400).send({
      message: "Sadrzaj ne sme biti prazan!",
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
        message: err.message || "Greska prilikom zakazivanja termina.",
      });
    else res.send(data);
  });
};

exports.vratiSve = (req, res) => {
  Termin.vratiSve((err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Greska prilikom dobavljanja termina.",
      });
    else res.send(data);
  });
};

exports.vratiJedan = (req, res) => {
  Termin.pronadjiPoJMBG(req.params.jmbg, (err, data) => {
    if (err) {
      if (err.kind === "Nije pronadjen termin") {
        res.status(404).send({
          message: `Nije pronadjen termin za pacijenta sa JMBG ${req.params.jmbg}.`,
        });
      } else {
        res.status(500).send({
          message: `Greska prilikom dobavljanja termina za pacijenta sa JMBG ${req.params.jmbg}`,
        });
      }
    } else res.send(data);
  });
};

exports.otkazi = (req, res) => {
  Termin.otkazi(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "Nije pronadjen termin") {
        res.status(404).send({
          message: `Not found Tutorial with id ${req.params.id}.`,
        });
      } else {
        res.status(500).send({
          message: "Could not delete Tutorial with id " + req.params.id,
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};
