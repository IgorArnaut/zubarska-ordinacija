const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Dobrodošli." });
});

require("./app/routes/termin.routes.js")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server je pokrenut na portu ${PORT}.`);
});
