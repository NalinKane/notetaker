const fs = require("fs");
const express = require("express");

const PORT = 8000;
const app = express();
var path = require("path");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "public/notes.html"));
  console.log(res);
  console.log(path);
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
