const sql = require("./db.js");

const Termin = function (termin) {
  this.id = termin.id;
  this.datum = termin.datum;
  this.vreme = termin.vreme;
  this.jmbg = termin.jmbg;
  this.ime = termin.ime;
  this.prezime = termin.prezime;
  this.brTelefona = termin.brTelefona;
};

Termin.zakazi = (noviTermin, result) => {
  sql.query("INSERT INTO termin SET ?", noviTermin, (err, res) => {
    if (err) {
      console.log("Greška: ", err);
      result(err, null);
      return;
    }

    console.log("Zakazan termin: ", { id: res.insertId, ...noviTermin });
    result(null, { id: res.insertId, ...noviTermin });
  });
};

Termin.pronadjiPoJMBG = (jmbg, result) => {
  sql.query(`SELECT * FROM termin WHERE jmbg LIKE ${jmbg}`, (err, res) => {
    if (err) {
      console.log("Greška: ", err);
      result(null, err);
      return;
    }

    console.log("Termin: ", res);
    result(null, res);
  });
};

Termin.vratiSve = (result) => {
  sql.query("SELECT * FROM termin", (err, res) => {
    if (err) {
      console.log("Greška: ", err);
      result(null, err);
      return;
    }

    console.log("Termin: ", res);
    result(null, res);
  });
};

Termin.otkazi = (id, result) => {
  sql.query("DELETE FROM termin WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Greška: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      result({ kind: "Nije pronađen termin" }, null);
      return;
    }

    console.log("Otkazan termin sa id: ", id);
    result(null, res);
  });
};

module.exports = Termin;
