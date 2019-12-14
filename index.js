const fs = require("fs");
const express = require("express");

const PORT = process.env.PORT || 8000;
const app = express();
const path = require("path");
const publicFolder = "public";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(publicFolder));

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, `${publicFolder}/notes.html`));
});
app.get("/api/notes", function(req, res) {
  fs.readFile("./db/db.json", (err, data) => {
    if (err) throw err;
    return res.json(JSON.parse(data));
  });
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, `${publicFolder}/index.html`));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
